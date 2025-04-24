export class Node {
  id: string;
  short_id: string;
  name: string;
  type: string;
  icon: string;

  constructor(instance: any) {
    this.id = instance.id;
    this.name = instance.name;
    this.type = instance.type;

    this.icon = `assets/img/nodes/${this.type.toLowerCase()}.png`
    this.short_id = this.id.length > 35
      ? `${this.id.slice(0, 35)}...`
      : this.id;
  }

}
