import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-newsdetails',
  templateUrl: './newsdetails.page.html',
  styleUrls: ['./newsdetails.page.scss'],
})
export class NewsdetailsPage implements OnInit {

  constructor(public activatedRoute:ActivatedRoute, public nav: NavController) { }

  ngOnInit() {
  }

  back() {
    this.nav.navigateRoot('tabs/tab2')
  }

}
