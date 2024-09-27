import { Component, OnInit } from '@angular/core';
import { SerService } from '../ser.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  lname1: any;
  userdata: any[] = [];

  constructor(private ser: SerService) { 
    this.lname1 = this.ser.lname; 
  }

  ngOnInit(): void {
    const storedUsers = sessionStorage.getItem('users');
    this.userdata = storedUsers ? JSON.parse(storedUsers) : [];
  }

  reset(user: any, i: any) {
    this.userdata.splice(i, 1);
    sessionStorage.setItem('users', JSON.stringify(this.userdata)); // Update sessionStorage after deletion
    console.log(this.userdata);
  }
}
