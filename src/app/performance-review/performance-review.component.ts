import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SerService } from '../ser.service';

@Component({
  selector: 'app-performance-review',
  templateUrl: './performance-review.component.html',
  styleUrls: ['./performance-review.component.css']
})
export class PerformanceReviewComponent implements OnInit {

  reviewForm: FormGroup;
  userdata: any[] = [];
  submitted = false;
  successMessage = '';

  constructor(private fb: FormBuilder, private serService: SerService) {
    this.reviewForm = this.fb.group({
      userId: ['', Validators.required],
      performanceRating: ['', Validators.required],
      comments: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    const storedUsers = sessionStorage.getItem('users');
    this.userdata = storedUsers ? JSON.parse(storedUsers) : [];
  }

  get f() {
    return this.reviewForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.reviewForm.invalid) {
      return;
    }

    const reviewData = this.reviewForm.value;

    this.serService.addPerformanceReview(reviewData.userId, reviewData).subscribe(
      (response: any) => {
        
        this.userdata = this.userdata.map(user => 
          user.email === reviewData.userId ? { ...user, ...reviewData } : user
        );
        sessionStorage.setItem('users', JSON.stringify(this.userdata));

        this.successMessage = 'Performance review submitted successfully!';
        this.reviewForm.reset();
        this.submitted = false;
      },
      (error: any) => {
        console.error('Error submitting review:', error);
      }
    );
  }
}

