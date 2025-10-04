import { inject, Injectable } from '@angular/core';
import { UserCredentials } from '../interfaces/user-credentials';
import { catchError, Observable, of, takeUntil, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl = '/api/auth';

  private readonly STORAGE_KEY = 'loggedInUser';

  private http = inject(HttpClient);
  private router = inject(Router);


  login(userCredentials: UserCredentials): Observable<User | null> {
    return this.http.post<User>(`${this.baseUrl}/login`, userCredentials, { withCredentials: true })
      .pipe(
        tap(user => this.setUser(user)),
        catchError(() => of(null))
      );
  }

  refreshToken(): Observable<User | null> {
    return this.http.post<User>(`${this.baseUrl}/refresh`, {}, { withCredentials: true })
      .pipe(
        tap(user => this.setUser(user)),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 400 || err.status === 401) {
            this.logout();
            this.router.navigate(['/auth/login']);
          }
          return of(null);
        })
      );
  }


  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`, {}).pipe(
      tap(() => this.clearUser())
    );
  }

  getUser(): User | null {
    const raw = sessionStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  setUser(user: User): void {
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  clearUser(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
  }


  teste() {
    this.http.post<void>(`${this.baseUrl}/teste`, {})
      .subscribe();
  }
}
