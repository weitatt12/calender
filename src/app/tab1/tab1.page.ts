import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  constructor(public nav: NavController) {}

  currentYear = new Date().getFullYear()
  currentMonth = new Date().getMonth() + 1
  currentDate = new Date().getDate()
  userInfor = {}
  selected = {
    month: this.currentMonth,
    year: this.currentYear,
    date: this.currentDate
  }
  event = ""
  eventTime 
  
  // the first time enter this page, it will loading 
  ngOnInit() {
    this.getDays(2, this.currentYear);
    this.getDay(2, this.currentYear);
    this.getDetails()
  }

  getDetails() {
    firebase.database().ref("users/").on("value", data=>{
      this.userInfor = data.val()
      console.log(this.userInfor)
      console.log(this.userInfor['event'])
      console.log(this.addEightDate(this.selected.date, this.selected.month, this.selected.year))
      console.log(this.userInfor['event'][this.addEightDate(this.selected.date, this.selected.month, this.selected.year)])
    })
  }

  createArray(x) {
    let holder =[];
    for (let i = 0; i < x; i++) {
      holder.push({
        month: this.currentMonth,
        year: this.currentYear,
        date: i + 1
      });
    }
    return holder;
  }

  getFormat(m, y) {
    return new Date(y,m,0,0,0,0).getTime()
  }

  // get format for event
  getFormat2(d, m , y) {
    return new Date(y,m-1,d,0,0,0).getTime()
  }

  // get the date monday or thursday..
  // get currentMonth and current Year
  monthup() {
    if (this.currentMonth < 12) {
      this.currentMonth += 1
    }
    else {
      this.currentYear += 1
      this.currentMonth = 1;
    }
  }
  
  monthdown() {
    if (this.currentMonth > 1) {
      this.currentMonth -= 1
    }
    else {
      this.currentYear -= 1
      this.currentMonth = 12;
    }
  }

  // to know the have how many space in front to start the first day
  // get date (like want 3(month) the first day located, so i need 3-1 = 2(month), and the 1 is the day)
  // which mean 2 (month) 29 + 1 = 30, it mean was another month(3) with the first day
  getDay(m, y) {
    return new Date(y,m-1,1,0,0,0).getDay()
  }

  // get the date - console output 31
  getDays(m, y) {
    return new Date(y,m,0,0,0,0).getDate()
  }

  signout() {
    firebase.auth().signOut().then(()=>{
      this.nav.navigateRoot("signin")
    })
  }

  add() {
    firebase.database().ref("users/event/" + this.addEightDate(this.selected.date, this.selected.month, this.selected.year)).update({
      text: this.event,
      eventTime: this.eventTime,
      date: firebase.database.ServerValue.TIMESTAMP,
      selected: this.selected
    }).then(()=>{
      this.event = "";
    })
  }

  addNew() {
    let data = {
      text: this.event,
      eventTime: this.eventTime,
      date: firebase.database.ServerValue.TIMESTAMP,
      selected: this.selected,
    }
    // users/event/date(20200825)/push the new object to here 
    firebase.database().ref('users/event/' + this.addEightDate(this.userInfor['event']['selected'].date, this.userInfor['event']['selected'].month, this.userInfor['event']['selected'].year)).push(data)
      .then(() => {
        this.event = ""
      })
  }

  // to check the number like 8 to 08, more than 10 then not need add 0 in front
  addEightDate(d, m , y) {
    return y.toString() + (m < 10? "0" + m.toString(): m.toString()) + (d < 10? "0" + d.toString(): d.toString())
  }
}
