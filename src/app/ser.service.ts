import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SerService implements CanActivate {
  userArray: any[] = [];
  userdata: any[] = [];
  performanceReviews: any[] = []; // Store performance reviews

  constructor(private http:Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    return true;
  }

  lname = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(3)], this.duplicatename),
    pwd: new FormControl('', [Validators.required, Validators.minLength(5), this.uppercase]),
    email: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')], this.duplicateemail.bind(this)),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    gender: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required])  // Team selection (HR, Developer, Tester, Admin)
  });
  
  

  // Custom asynchronous validator for checking duplicate usernames
  duplicatename(e: any): Promise<any> {
    let prom = new Promise((resolve, reject) => {
      let users = ['user1', 'user2', 'user3'];
      let name = e.value;
      setTimeout(() => {
        if (users.indexOf(name) >= 0) {
          resolve({ userexist: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
    return prom;
  }

  // Custom asynchronous validator for checking duplicate emails
  duplicateemail(e: any): Promise<any> {
    let prom = new Promise((resolve, reject) => {
      let stored = sessionStorage.getItem('users');
      this.userdata = stored ? JSON.parse(stored) : [];
      let email = e.value;

      // Check if the email exists in sessionStorage
      setTimeout(() => {
        let emailExists = this.userdata.some((user) => user.email === email);
        if (emailExists) {
          resolve({ emailexist: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
    return prom;
  }

  // Validator for checking uppercase in the password
  uppercase(e: any) {
    const pattern = /[A-Z]/;
    if (pattern.test(e.value)) {
      return null;
    }
    return { uppererror: true };
  }

  // Store user data in sessionStorage
  sub() {
    let storedUsers = sessionStorage.getItem('users');
    let usersArray1: any[] = storedUsers ? JSON.parse(storedUsers) : [];
    const newUser = this.lname.value;
    usersArray1.push(newUser);
    sessionStorage.setItem('users', JSON.stringify(usersArray1));
    console.log('Stored Data:', usersArray1);

    this.userArray = usersArray1;
    return { userArray: this.userArray };
  }

  // Add a performance review to a user
  addPerformanceReview(userId: number, review: any): Observable<any> {
    const user = this.userArray.find((user) => user.id === userId);
    if (user) {
      user.performanceReview = review;
      console.log(`Performance review added to user ID ${userId}`, review);
      
      // Return the updated user data wrapped in an Observable
      return of({ success: true, message: 'Performance review added successfully', user });
    } else {
      // If user is not found, return an error wrapped in an Observable
      return of({ success: false, message: `User with ID ${userId} not found` });
    }
  }

  // Get performance reviews for a specific user
  getPerformanceReviews(userId: number) {
    return this.performanceReviews.filter(review => review.userId === userId);
  }
}
