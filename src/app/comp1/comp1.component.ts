
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SerService } from '../ser.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css']
})
export class Comp1Component  {

  constructor(private route:Router,private ser:SerService,private location:Location){}
  lname=this.ser.lname;
   sub()
   {
        this.ser.sub();
        this.lname.reset();
   }
  //   }
  // ngOnInit(): void {
  //   this.http.post('https://fakestoreapi.com/products',{name:"hello from app.ts"}).subscribe((response)=>{console.log(response)})
  // }
  disable=false;

  title = 'project1';
   move()
   {
    
      this.location.back(); 
    console.log('execute')
    this.route.navigate(['/login']);
   }
  
//   name: string;
//   email: string;
//   city: string;
//   state: string;
//   pincode: string;
//   address: string;
  
//   constructor() {
//     this.address = '';
//     this.city = '';
//     this.email = '';
//     this.name = '';
//     this.state = '';
//     this.pincode = '';
// }
// show=false
// fun()
// {
//    this.show=true;
// }
showUserData: any[] = [];

val=true

topic=['Male','Female','Prefer Not to say']
color=true
value={

  background:'green',
  color:'white'
}
address=new FormGroup({
  add:new FormArray([
    new FormControl(),
    
  ])
})
add() {
  const addArray = this.address.get('add') as FormArray
  addArray?.push(new FormControl()); 
}
 
show() {
  this.route.navigate(['/show'])
  this.val=false
}
}

