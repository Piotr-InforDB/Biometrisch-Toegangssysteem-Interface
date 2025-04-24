import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HelpersService} from "../../services/helpers/helpers.service";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
  standalone: false,
})
export class VerificationPage{

  public id: string | null = null;

  constructor(
    public helpers: HelpersService,
    private route: ActivatedRoute
  ) { }

  ionViewWillEnter(){
    this.id = this.route.snapshot.paramMap.get('id')
    console.log(this.id);
  }

}
