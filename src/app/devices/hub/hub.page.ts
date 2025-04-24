import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Node} from "../../models/node/node.model";
import {MqttService} from "../../services/mqtt/mqtt.service";
import {HubUser} from "../../models/hub-user/hub-user.model";
import {HelpersService} from "../../services/helpers/helpers.service";

@Component({
  selector: 'app-hub',
  templateUrl: './hub.page.html',
  styleUrls: ['./hub.page.scss'],
  standalone: false,
})
export class HubPage {

  public id: string | null = null;
  public users: HubUser[] = [];

  constructor(
    public helpers: HelpersService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected mqtt: MqttService,
  ) { }

  ionViewWillEnter() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getUsers();
  }

  //Users
  addUser(){
    this.router.navigate(['tabs/devices/hub/add-user'])
  }
  async getUsers(){
    await this.mqtt.subscribe('hub/users/get/response', this.setUsers.bind(this));
    this.mqtt.publish('hub/users/get')
  }
  setUsers(users: any){
    this.users = users.map((user: any) => new HubUser(user))
  }

}
