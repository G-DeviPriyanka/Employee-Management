import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SerService } from '../ser.service';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.css']
})
export class CertificationsComponent implements OnInit {
  
  certifications: { name: string, issueDate: string }[] = [];
  

  certificationForm: FormGroup |any;
  constructor(private fb: FormBuilder, private ser: SerService) { 
    console.log("from certification", this.ser.lname.controls.uname.value);
  }
  
  ngOnInit(): void {
    this.certificationForm = this.fb.group({
      certificationName: ['', Validators.required],
      issueDate: ['']
    });
    
    const storedCertifications = sessionStorage.getItem('certifications');
    this.certifications = storedCertifications ? JSON.parse(storedCertifications) : [];
  }

  addCertification(): void {
    if (this.certificationForm.valid) {
      const newCertification = this.certificationForm.value;
      this.certifications.push({
        name: newCertification.certificationName,
        issueDate: newCertification.issueDate
      });

      const storedUsers = sessionStorage.getItem('users');
      let userdata: any[] = storedUsers ? JSON.parse(storedUsers) : [];
      let userIndex = userdata.findIndex(user => user.email === this.ser.lname.controls.email.value);

      if (userIndex !== -1) {
        console.log("User found, updating data");
        userdata[userIndex].certifications = this.certifications;
        sessionStorage.setItem('users', JSON.stringify(userdata));
      } else {
        console.log("User not found");
        // Optionally, handle the case where the user is not found.
      }

      this.certificationForm.reset();
    }
  }
}
