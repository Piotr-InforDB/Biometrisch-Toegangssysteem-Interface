import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificationPageRoutingModule } from './verification-routing.module';

import { VerificationPage } from './verification.page';
import {DeviceCardComponent} from "../device-card/device-card.component";
import {WebcamComponent} from "./webcam/webcam.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificationPageRoutingModule,
    DeviceCardComponent,
    WebcamComponent
  ],
  declarations: [VerificationPage]
})
export class VerificationPageModule {}
