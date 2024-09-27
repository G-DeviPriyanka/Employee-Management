import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-taskmanager',
  templateUrl: './taskmanager.component.html',
  styleUrls: ['./taskmanager.component.css']
})
export class TaskmanagerComponent implements OnInit {

  taskgrp: FormGroup |any;
  userarray: any[] = [];

  constructor() {}

  ngOnInit(): void {
    const storedUsers = sessionStorage.getItem('users');
    this.userarray = storedUsers ? JSON.parse(storedUsers) : [];
    
    this.taskgrp = new FormGroup({
      task: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      assignDate: new FormControl('', [Validators.required]), 
      assignee: new FormControl('', [Validators.required])   
    });
  }
   
  onSubmit(): void {
    if (this.taskgrp.valid) {
      const formValues = this.taskgrp.value;

      const userIndex = this.userarray.findIndex(user => user.email === formValues.assignee);

      if (userIndex !== -1) {
        if (!this.userarray[userIndex].tasks) {
          this.userarray[userIndex].tasks = [];
        }
        
        this.userarray[userIndex].tasks.push({
          task: formValues.task,
          description: formValues.description,
          assignDate: formValues.assignDate
        });

        sessionStorage.setItem('users', JSON.stringify(this.userarray));

        console.log('Task assigned:', this.taskgrp.value);
        this.taskgrp.reset(); 
      } else {
        console.error('User not found');
      }
    } else 
    {
      console.error('Form is invalid');
    }
  }
}
