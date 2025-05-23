import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HubPageRoutingModule } from './hub-routing.module';

import { HubPage } from './hub.page';
import {DeviceCardComponent} from "../device-card/device-card.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HubPageRoutingModule,
        DeviceCardComponent
    ],
  declarations: [HubPage]
})
export class HubPageModule {}
