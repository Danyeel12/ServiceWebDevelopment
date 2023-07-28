import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private readonly baseUrl = 'http://localhost:8081'; 

  constructor(private http: HttpClient) {}

  getReviews(page: number): Observable<any[]> {  // need to implement endpoint at backend that takes page num as param for querying
    return this.http.get<any[]>(`${this.baseUrl}/api/reviews?page=${page}`);
  }

  postReview(review: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/reviews`, review); // need to implement endpoint at backend that accepts POST req
  }
}
