import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public httpClient:HttpClient, public nav:NavController) {}

  newsArr = []

  ngOnInit() {
    this.getInfo()
  }

  getInfo() {
    let apiKey = "391119c217834f999c551fb63682f22d"
    let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=391119c217834f999c551fb63682f22d"

    this.httpClient.get(url).subscribe(newsdata => {
      let obj = <any>newsdata
      this.newsArr = Object.values(obj.articles)
      console.log(this.newsArr)
    })
  }
}
