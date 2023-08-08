import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | null = null;
  private readonly baseUrl = 'http://localhost:8080'; // Corrected base URL

  constructor(private http: HttpClient) { }

  //method for error handling
  private handleError(error: HttpErrorResponse) {
    let errorMsg = '';
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
    } else {
      errorMsg = `Error Code: ${error.status}, Message: ${error.message}`;
    }
    console.log(errorMsg);
    return error;
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/login`, { email, password });
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }

  logout(): void {
    this.http.post(`${this.baseUrl}/user/logout`, {}).pipe(
      tap(() => this.user = null)
    ).subscribe();
  }

  getUser(): User | null {
    return this.user;
  }

  register(fname: string, lname: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/register`, { fname, lname, email, password })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          } else {
            errorMsg = `Error Code: ${error.status}, Message: ${error.message}`;
          }
          console.log(errorMsg);
          return new Observable(observer => observer.error(errorMsg));
        })
      );
  }

}
