// form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  d = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  userArray1: any[] = [];
  resu: any[] = [];  

  constructor() { }

  ngOnInit(): void {}

  res() {
    let query = this.d.get('name')?.value;
    query=query?.toLowerCase();
    let stored = sessionStorage.getItem('users');
    let userArray: any[] = stored ? JSON.parse(stored) : [];
    
    this.resu = userArray.filter(user =>
      user.uname.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
    );
  }

  selectSuggestion(suggestion: any) {
    this.d.get('name')?.setValue(suggestion.uname);
    this.userArray1 = [suggestion];
    this.resu = [];
  }

  emp() {
    let stored = sessionStorage.getItem('users');
    let userArray: any[] = stored ? JSON.parse(stored) : [];
    this.userArray1 = [];

    for (let i = 0; i < userArray.length; i++) {
      if (userArray[i].uname === this.d.controls.name.value || userArray[i].email === this.d.controls.name.value) {
        this.userArray1.push(userArray[i]);
        break;
      }
    }

    if (this.userArray1.length === 0)
    {
      console.log("User not found");
    }
  }
}
