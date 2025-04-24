import { Injectable } from '@angular/core';
import mqtt, {IClientOptions} from 'mqtt';
import type { MqttClient } from 'mqtt';
import {HelpersService} from "../helpers/helpers.service";

@Injectable({
  providedIn: 'root'
})
export class MqttService {

  public broker: string = '192.168.2.89';
  // public broker: string = 'localhost';
  public client: MqttClient | undefined;
  public status = 'disconnected';
  public subscriptions: { id: string, topic: string, callback: Function }[] = [];

  constructor(
    protected helpers: HelpersService,
  ) {
    this.connect()
  }

  connect(){
    return new Promise(resolve => {

      const options: IClientOptions = {
        clientId: 'ionic_client_' + Math.random().toString(16).substr(2, 8),
        username: 'debug',
        password: 'admin',
        protocol: 'ws',
        port: 9001,
        rejectUnauthorized: false,
        connectTimeout: 4000,
      };
      console.log('Connecting to MQTT broker via WebSocket...');
      this.client = mqtt.connect(`${options.protocol}://${this.broker}:${options.port}`, options);
      this.client.on('connect', () => {
        this.status = 'connected';
        resolve(true);
      });
      this.client.on('message', (topic, message) => {
        this.messageHandler(topic, message);
        // console.log(`Received message on ${topic}: ${message.toString().slice(0, 10)}`);
      });
      this.client.on('error', (err) => {
        this.status = 'error';
        resolve(false);
        console.error('MQTT connection error:', err);
      });
      this.client.on('close', () => {
        this.status = 'disconnected';
        resolve(false);
        console.log('Connection closed');
      });
      this.client.on('offline', () => {
        this.status = 'offline';
        resolve(false);
        console.log('Client went offline');
      });

    })


  }
  disconnect(){
    if(this.client){
      this.client.end();
    }

    this.subscriptions = [];
  }
  reconnect(){
    this.disconnect();
    return this.connect();
  }

  messageHandler(topic: string, message: Buffer){
    this.subscriptions.forEach((subscription) => {
      const { topic: sub_topic, callback } = subscription;
      if(topic !== sub_topic){ return; }

      if(this.helpers.isJSON(message.toString())){
        message = JSON.parse(message.toString());
      }

      callback(message);
    })
  }
  async subscribe(topic: string, callback: Function): Promise<string | null>{
    const status = await this.subscribeClient(topic);
    if(!status){
      console.log(`Failed subscribing to ${topic}`);
      return null;
    }

    const id = this.helpers.randomString()
    this.subscriptions.push({ id, topic, callback });

    console.log(`Subscribed to ${topic}: ${id}`);

    return id;
  }
  subscribeClient(topic: string): Promise<boolean>{
    return new Promise(resolve => {

      this.client?.subscribe(topic, (err) => {
        resolve(!err);
      });

    });
  }

  publish(topic: string, message: string | null = null){
    if(message === null){ message = ''; }
    console.log(`Publishing ${topic}: ${message}`);
    this.client?.publish(topic, message);
  }

}
