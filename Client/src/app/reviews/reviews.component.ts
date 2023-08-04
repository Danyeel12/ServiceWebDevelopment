import { Component, OnInit } from '@angular/core';
import { Review } from '../reviews.model';
import { ReviewsService } from '../reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];  // Define the type here
  page = 1;

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

  onScroll(): void {
    this.page++;
    this.fetchReviews();
  }
}
