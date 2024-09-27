import { Component, OnInit } from '@angular/core';
import { SerService } from '../ser.service';

@Component({
  selector: 'app-usertask',
  templateUrl: './usertask.component.html',
  styleUrls: ['./usertask.component.css']
})
export class UsertaskComponent implements OnInit {
  loggedInUser: any;
  userTasks: any[] = [];

  constructor(private ser:SerService) { }

  ngOnInit(): void {
    // Fetch the logged-in user's information
    const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail');
    const storedUsers = sessionStorage.getItem('users');
    const userdata = storedUsers ? JSON.parse(storedUsers) : [];
    let userIndex = -1;
  
    // Find the user by email and password
    for (let i = 0; i < userdata.length; i++) {
      if (userdata[i].email === this.ser.lname.controls.email.value ) {
        console.log("User found, updating data");
        userIndex = i;
        break;
      }
    }
    // Find the logged-in user by email
    

    if (userIndex!=-1) {
      console.log("User found,");
      // Get tasks for the logged-in user
      this.userTasks = userdata[userIndex].tasks || [];
      console.log("tasks from",this.userTasks)
    } else {
      console.error('No logged-in user found or user has no tasks.');
    }
  }
}
