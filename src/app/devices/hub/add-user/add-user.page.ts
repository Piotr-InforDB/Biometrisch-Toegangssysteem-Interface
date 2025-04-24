import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

import {CameraService} from "../../../services/camera/camera.service";
import {HelpersService} from "../../../services/helpers/helpers.service";
import {MqttService} from "../../../services/mqtt/mqtt.service";


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
  standalone: false,
})
export class AddUserPage {

  public loading: boolean = false;

  public id: string;
  public name: string = '';
  public images: any[] = [];

  constructor(
    public helpers: HelpersService,
    private camera: CameraService,
    private mqtt: MqttService,
  ) {
    this.id = uuidv4()
  }


  ionViewWillEnter(){
    this.clear();

    console.log('add-user')
  }

  //Form cycle
  clear(){
    this.name = '';
    this.images = [];
    this.loading = false;
  }
  async save(){
    if(!this.name || !this.images.length){
      await this.helpers.notification('Name and images are required!');
      return;
    }

    this.loading = true;
    const images = this.images.map( file => file.base64String );

    await this.mqtt.subscribe(`hub/user/register/${this.id}/confirm`, this.saveConfirm.bind(this));
    this.mqtt.publish('hub/user/register', JSON.stringify({
      id: this.id,
      name: this.name,
      images: images,
    }))
  }
  async saveConfirm(message: string){
    await this.helpers.notification('User stored succesfully')
    this.helpers.back();
  }

  // Images
  async selectUserImage(){
    const image = await this.camera.getImage();
    if(!image){ return; }

    this.images.push(image);
  }

}
