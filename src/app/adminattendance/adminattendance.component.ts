import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-adminattendance',
  templateUrl: './adminattendance.component.html',
  styleUrls: ['./adminattendance.component.css']
})
export class AdminattendanceComponent {

 
  attendanceRecords: { email:string,date: string, status: string, approvalStatus: string }[] = [];

  // constructor() { }

  // ngOnInit(): void {
  //   const storedRecords = sessionStorage.getItem('attendanceRecords');
  //   this.attendanceRecords = storedRecords ? JSON.parse(storedRecords) : [];
  // }

  // updateApprovalStatus(index: number, status: string): void {
  //   this.attendanceRecords[index].approvalStatus = status;
  //   sessionStorage.setItem('attendanceRecords', JSON.stringify(this.attendanceRecords));
  // }


  ngOnInit(): void {
    const storedUsers = sessionStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    this.attendanceRecords = users.flatMap((user: any) => {
      if (user.attendanceRecords) {
        return user.attendanceRecords.map((record: any) => ({ ...record, email: user.email }));
      }
      return [];
    });
  }

  updateApprovalStatus(index: number, status: string): void {
    this.attendanceRecords[index].approvalStatus = status;
    const storedUsers = sessionStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const userIndex = users.findIndex((user: any) => user.email === this.attendanceRecords[index].email);
    if (userIndex !== -1) {
      const attendanceIndex = users[userIndex].attendanceRecords.findIndex((record: any) =>
        record.date === this.attendanceRecords[index].date &&
        record.status === this.attendanceRecords[index].status &&
        record.approvalStatus === 'Pending'
      );
      if (attendanceIndex !== -1) {
        users[userIndex].attendanceRecords[attendanceIndex].approvalStatus = status;
        sessionStorage.setItem('users', JSON.stringify(users));
      }
    }
  }
}



