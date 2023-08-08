import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from './reviews.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private readonly baseUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) {}

  getReviews(page: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/api/reviews?page=${page}`);
  }

  postReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/api/reviews`, review);
  }

  updateReview(review: Review): Observable<Review> {
    return this.http.put<Review>(`${this.baseUrl}/api/reviews/${review}`, review);
  }

  deleteReview(review: Review): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/reviews/${review.author}`);
  }  
}
