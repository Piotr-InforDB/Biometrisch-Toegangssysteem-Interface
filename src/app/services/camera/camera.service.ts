import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(
    private actionSheetCtrl: ActionSheetController
  ) { }

  async getImage(): Promise<Photo | null> {
    return new Promise(async (resolve) => {
      const actionSheet = await this.actionSheetCtrl.create({
        header: 'Select Image Source',
        buttons: [
          {
            text: 'Take Photo',
            icon: 'camera',
            handler: async () => {
              const image = await this.captureImage('camera');
              resolve(image);
              return true;
            }
          },
          {
            text: 'Choose from Gallery',
            icon: 'image',
            handler: async () => {
              const image = await this.captureImage('photos');
              resolve(image);
              return true;
            }
          },
          {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              resolve(null);
              return true;
            }
          }
        ]
      });

      await actionSheet.present();
    });
  }

  private async captureImage(source: 'camera' | 'photos'): Promise<Photo | null> {
    try {
      return await Camera.getPhoto({
        quality: 25,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: source === 'camera' ? CameraSource.Camera : CameraSource.Photos,
        width: 750,
        correctOrientation: true,
        webUseInput: true,
        presentationStyle: 'popover'
      });
    }
    catch (error) {
      console.error('Error getting image:', error);
      return null;
    }
  }

}
