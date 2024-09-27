import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SerService } from '../ser.service';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  

  constructor(@Inject(BnNgIdleService) private bn: BnNgIdleService, private route: Router, private ser: SerService) {}

  lname = this.ser.lname;
  msg = 'welcome';
  userName = this.lname.controls.uname.value;

  ngOnInit(): void {
    console.log('Initial User Name:', this.userName);
    this.lname.get('uname')?.valueChanges.subscribe((newValue) => {
      console.log('Updated User Name:', newValue);
      this.userName = newValue;
    });

  
    this.bn.startWatching(5000).subscribe((isTimeout: Boolean) => {
      if (isTimeout) {
        console.log('Session timeout');
        this.route.navigate(['/login']);
        this.bn.stopTimer();
      }
    });
  }

  logout()
  {
    this.route.navigate(['/login']);
    this.bn.stopTimer();
    
  }

}
