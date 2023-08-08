import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Review } from '../reviews.model';
import { ReviewsService } from '../reviews.service';
import { response } from 'express';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];
  page = 1;
  selectedReview: Review | null = null;

  constructor(private reviewsService: ReviewsService) { }

  ngOnInit(): void {
    this.fetchReviews();
  }

  
  fetchReviews(): void {
    this.reviewsService.getReviews(this.page)
      .subscribe(newReviews => {
        this.reviews.push(...newReviews);
      });
  }

  updateReview(updatedReview: Review): void {
    this.reviewsService.updateReview(updatedReview).subscribe(updatedReview => {
      const index = this.reviews.findIndex(r => r._id === updatedReview._id);
      if (index !== -1) {
        this.reviews[index] = updatedReview;
        this.selectedReview = null; // Clear the selected review
      }
    });
  }
  
  onScroll(): void {
    this.page++;
    this.fetchReviews();
  }

  onSubmit(form: NgForm): void {
    const { name, comments, rating } = form.value;

    const review: Review = {
      author: name,
      title: `Rating: ${rating}`,
      content: comments,
      date: new Date(),
      id: function (id: any): void {
        throw new Error('Function not implemented.');
      }
    };

    this.reviewsService.postReview(review).subscribe(response => {
      console.log('Review posted', response);
      this.reviews.unshift(response); 
      form.reset(); // resets the form
    }, error => {
      console.error('Error occurred when posting review', error);
    });
}



onUpdate(review: Review): void {
  this.selectedReview = review;
}

// Modify onDelete method
onDelete(review: Review): void {
  if (confirm('Are you sure you want to delete this review?')) {
    this.reviewsService.deleteReview(review).subscribe(() => {
      this.reviews = this.reviews.filter(r => r !== review);
      if (this.selectedReview === review) {
        this.selectedReview = null; // Clear the selected review if it's the one being deleted
      }
    });
  }
}

cancelUpdate(): void {
  this.selectedReview = null;
}

  onRead(): void{
    console.log('Read button clicked')
  }
}

