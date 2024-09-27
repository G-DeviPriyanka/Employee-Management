import { Component, OnInit } from '@angular/core';
import { SerService } from '../ser.service';
import { Router, UrlSerializer } from '@angular/router';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editcomponent',
  templateUrl: './editcomponent.component.html',
  styleUrls: ['./editcomponent.component.css']
})
export class EditcomponentComponent implements OnInit {

 

  constructor(private ser:SerService,private route:Router) { }
 
  lname=this.ser.lname;
  topic=['react','javascript','angular']
  address=new FormGroup({
    add:new FormArray([
      new FormControl(),
      
    ])
  })
  add() {
    const addArray = this.address.get('add') as FormArray
    addArray?.push(new FormControl()); 
  }
  color=true
 
  ngOnInit(): void {
  }
  method()
  {
  let storedUsers = sessionStorage.getItem('users');
  let userdata:any[]=[] = storedUsers ? JSON.parse(storedUsers) : [];
    let userIndex = -1;
  
    // Find the user by email and password
    for (let i = 0; i < userdata.length; i++) {
      if (userdata[i].email === this.lname.controls.email.value ) {
        console.log("User found, updating data");
        userIndex = i;
        break;
      }
    }
  
    if (userIndex !== -1) {
      // Update the user data with the new form values
      userdata[userIndex] = {
        email: this.lname.value.email,
        pwd: this.lname.value.pwd,
        uname: this.lname.value.uname || null,

        topic: this.lname.value.gender || null,
        phone: this.lname.value.phone || null,
        timeOfDay: this.lname.value.type || null

      };
  
      console.log("Updated user data:", userdata[userIndex]);
      
      // Update session storage with the modified user data
      sessionStorage.setItem('users', JSON.stringify(userdata));
    } else {
      console.log("User not found with the provided email and password.");
    }
  }
  
move()
{
  this.lname.reset();
}
}

