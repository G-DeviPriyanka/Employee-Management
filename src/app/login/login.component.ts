import { Component, OnInit } from '@angular/core';
import { SerService } from '../ser.service';
import { Location } from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private ser:SerService,private loc:Location,private route:Router) { }
  lname=this.ser.lname;
  ngOnInit(): void {
    //this.bnIdle.start
  }
  val=0
  storedUsers = sessionStorage.getItem('users');
  usersArray1: any[] = this.storedUsers ? JSON.parse(this.storedUsers) : [];
  verify()
  {
      for(let i=0;i<this.usersArray1.length;i++)
      {
        
       
        if((this.usersArray1[i].email==this.lname.controls.email.value) && (this.usersArray1[i].pwd==this.lname.controls.pwd.value))
        {
          alert("Successfully login...")
          this.val=1;
          break;
        }
        
      }
      if (this.val === 1 && this.lname.controls.email.value === 'admin@gmail.com' && this.lname.controls.pwd.value === 'Admin') {
        this.route.navigate(['/admin']);
      }
      else if(this.val==1)
      {
        this.route.navigate(['/user']);
      }
      
     else
     {
           alert("Check ur credentials")
     }
  }
}
