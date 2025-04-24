import { Component, OnInit } from '@angular/core';
import {MqttService} from "../services/mqtt/mqtt.service";
import { Node } from "../models/node/node.model"
import {Router} from "@angular/router";

@Component({
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss'],
  standalone: false,
})
export class NetworkPage{

  public nodes: Node[] = [];

  constructor(
    public mqtt: MqttService,
    public router: Router,
  ) { }

  ionViewWillEnter(){
    this.init();
  }

  async init(){
    await this.mqtt.reconnect();
    await this.mqtt.subscribe('presence/confirm', this.presenceConfirm.bind(this));
    this.presenceCheck();
  }
  async refresh(event: Event){
    await this.init();
    await (event.target as HTMLIonRefresherElement).complete();
  }

  //Presence
  presenceCheck(){
    this.nodes = [];
    this.mqtt.publish('presence');
  }
  presenceConfirm(client: any){
    const exists = this.nodes.find(row => row.id == client.id);
    if(exists){ return; }

    const node = new Node(client);
    this.nodes.push(node);
  }

  //Nodes
  openNode(id: string){
    const node = this.nodes.find((node: Node) => node.id == id);
    if(!node){ return; }

    this.router.navigate([`tabs/devices/${node.type.toLowerCase()}/${id}`]);
  }

}
