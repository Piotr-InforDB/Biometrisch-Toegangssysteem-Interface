import { Injectable } from '@angular/core';
import {NavController, ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(
    private nav: NavController,
    private toast: ToastController,
  ) { }

  //Route
  back(){
    this.nav.back();
  }


  // Strings
  randomString(length: number = 10) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }

    return result;
  }
  isJSON(json: string): boolean{
    try {
      JSON.parse(json);
      return true;
    }
    catch (e) {
      return false;
    }
  }
  tryJSON(json: string){
    try{
      return JSON.parse(json);
    }
    catch (e) {
      return json;
    }
  }

  //dom
  async notification(message: string){
    const toast = await this.toast.create({
      message: message,
      position: 'bottom',
      duration: 10000
    });
    await toast.present();
  }

}
