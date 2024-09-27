import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Michael Johnson' }
  ];

  reviews: any[] = [];

  constructor() { }

  getEmployees() {
    return this.employees;
  }

  addReview(review: any) {
    this.reviews.push(review);
    console.log('Review added:', review);
  }

  getReviews() {
    return this.reviews;
  }
}
