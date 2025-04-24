import {Component, input, OnInit} from '@angular/core';
import {MqttService} from "../../services/mqtt/mqtt.service";
import {Node} from "../../models/node/node.model";
import {IonicModule} from "@ionic/angular";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss'],
  imports: [
    IonicModule,
    NgIf
  ]
})
export class DeviceCardComponent implements OnInit{

  //IO
  id = input<string | null>(null);

  //Instances
  public node: Node | null = null;

  constructor(
    private mqtt: MqttService,
  ) { }

  ngOnInit() {
    console.log(this.id());
    if(!this.id()){ return; }
    this.getNode();
  }

  getNode(){
    this.mqtt.subscribe(`client/identity/${this.id()}`, this.setNode.bind(this));
    this.mqtt.publish('client/identity', this.id());
  }
  setNode(message: any){
    this.node = new Node(message);
  }

}
