export class HubUser {

  id: string;
  name: string;
  preview: string;

  constructor(instance: any) {
    this.id = instance.id;
    this.name = instance.name
    this.preview = `data:image/jpeg;base64,${instance.preview}`;
  }

}
