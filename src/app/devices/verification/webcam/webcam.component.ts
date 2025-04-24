import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {MqttService} from "../../../services/mqtt/mqtt.service";
import {NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {HubUser} from "../../../models/hub-user/hub-user.model";

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss'],
  imports: [
    IonicModule,
    NgIf,
    NgOptimizedImage,
    NgStyle
  ]
})
export class WebcamComponent  implements OnInit {

  public image: any;
  public recognition: {
    face: boolean,
    recognized: boolean,
    user: HubUser | null,
  } | null = null;

  constructor(
    private mqtt: MqttService
  ) { }

  ngOnInit() {
    this.mqtt.subscribe('webcam/feed', this.setFeed.bind(this))
    this.mqtt.subscribe('facial_recognition/status', this.setFacialRecognition.bind(this));
  }

  setFeed(message: any){
    const blob = new Blob([message], { type: 'image/jpeg' });
    const reader = new FileReader();

    reader.onload = () => {
      this.image = reader.result as string;
    };

    reader.readAsDataURL(blob);
  }
  setFacialRecognition(message: any){
    this.recognition = message;

    if(this.recognition?.user){
      this.recognition.user = new HubUser(this.recognition.user);
    }

    console.log(this.recognition)
  }

}
