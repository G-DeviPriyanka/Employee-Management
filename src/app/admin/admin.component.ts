import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SerService } from '../ser.service';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

constructor(@Inject(BnNgIdleService)private bn:BnNgIdleService,private route:Router,private ser:SerService) { }
lname=this.ser.lname;
msg='welcome';

adminEmail=this.lname.controls.email.value;

ngOnInit(): void {
  this.bn.startWatching(10000).subscribe((isTimeout:Boolean) => {
    if(isTimeout)
    {
           console.log("timeout is listing...")
           console.log('sessions timeout');
           this.route.navigate(['/login']);
    }
  });
}
show(){
  this.route.navigate(['/login']
    
  )
}
add()
{
  this.route.navigate(['/add'])
}
}
