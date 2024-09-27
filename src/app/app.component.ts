
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  
   constructor(private route:Router,private http:HttpClient){this.route.navigate(['/comp1']);}
  ngOnInit(): void {
    //this.http.get('https://fakestoreapi.com/products').subscribe((res)=>{console.log(res)});
  }
   
  //   }
  // ngOnInit(): void {
  //   this.http.post('https://fakestoreapi.com/products',{name:"hello from app.ts"}).subscribe((response)=>{console.log(response)})
  // }
 
  
    title = 'project1';

   
  
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
course=[
  {
    id:1,name:"react"
  },
  {
    id:2,name:"angular"
  },
  {
    id:3,name:"react2"
  },
  {
    id:4,name:"angular2"
  }
]
}

