import { Injectable } from '@angular/core';
import { UserCredentials } from '../interfaces/user-credentials';
import { Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../interfaces/user';

function generateToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let jwt = '';
  while (jwt.length < 20) {
    const char = chars.charAt(Math.floor(Math.random() * chars.length));
    if (!jwt.includes(char)) {
      jwt += char;
    }
  }
  return jwt;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    login(payload: UserCredentials): Observable<{ token: string }> {
    if (payload.email === 'filipe.machado@gmail.com' && payload.password === '0123456789') {
      return of({ token: generateToken() });
    }
    return throwError(() => new HttpErrorResponse({
      status: 401,
      statusText: 'Unauthorized'
    }));
  }

  logout() {
    return of({});
  }

  getCurrentUser(token: string): Observable<User> {
    return of({
      email: 'admin'
    })
  }

  refreshToken(token: string) {
    return of({ token: generateToken() });
  }

}
