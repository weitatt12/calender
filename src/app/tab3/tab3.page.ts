import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public httpClient:HttpClient) {}

  temperature = ""
  place
  weatherCondition
  icon

  ngOnInit() {
    this.getInfo()
  }

  getInfo() {
    let apiKey = "e254369c1aae56c5c5d1ee91c8b980c3"
    let url = "https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=e254369c1aae56c5c5d1ee91c8b980c3"

    this.httpClient.get(url).subscribe((temperaturedata) => {
      let obj = <any>temperaturedata;
      console.log(obj)
      this.place = obj.name
      this.weatherCondition = obj.weather[0].main
      this.icon = "http://openweathermap.org/img/w" + obj.weather[0].icon + ".png"
      this.temperature = ((parseFloat(obj.main.temp)-273.15).toFixed()).toString() + "°c";
    })
  }

}
