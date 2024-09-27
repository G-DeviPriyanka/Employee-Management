import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SerService } from '../ser.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  attendanceForm: FormGroup;
  attendanceRecords: { email: string; date: string; status: string; approvalStatus: string }[] = [];

  constructor(private fb: FormBuilder, private ser: SerService) {
    this.attendanceForm = this.fb.group({
      date: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialize email when the component loads
    this.updateAttendanceRecordsWithEmail();
  }

  updateAttendanceRecordsWithEmail(): void {
    // Fetch email from service
    const email = this.ser.lname.controls.email.value!;
    
    // Update all attendance records with the email
    this.attendanceRecords.forEach(record => {
      record.email = email;
    });
  }

  onSubmit(): void {
    let userIndex = -1;
    const storedUsers = sessionStorage.getItem('users');
    const userdata = storedUsers ? JSON.parse(storedUsers) : [];

    for (let i = 0; i < userdata.length; i++) {
      if (userdata[i].email === this.ser.lname.controls.email.value) {
        console.log("User found, updating data");
        userIndex = i;
        break;
      }
    }

    if (this.attendanceForm.valid) {
      const newRecord = {
        email: this.ser.lname.controls.email.value, // Set email here
        date: this.attendanceForm.value.date,
        status: this.attendanceForm.value.status,
        approvalStatus: 'Pending'
      };

      // Update the user's attendance records
      if (userIndex !== -1) {
        console.log("User found,");
        userdata[userIndex].attendanceRecords = userdata[userIndex].attendanceRecords || [];
        userdata[userIndex].attendanceRecords.push(newRecord);
        sessionStorage.setItem('users', JSON.stringify(userdata));
        this.attendanceRecords = userdata[userIndex].attendanceRecords; 
        console.log("attendance from", this.attendanceRecords);
      } else {
        console.error('No logged-in user found or user has not submitted the attendance.');
      }

      this.attendanceForm.reset();
    }
  }
}
