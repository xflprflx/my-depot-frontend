import { inject, Injectable } from '@angular/core';
import { UserCredentials } from '../interfaces/user-credentials';
import { catchError, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../interfaces/user';
import { AuthTokenResponse } from '../interfaces/auth-token-response';
import { environment } from '../../../../environments/environment';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = '/api/oauth2/token';
  private clientId = environment.clientId;
  private clientSecret = environment.clientSecret;

  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private expiresAtKey = 'expires_in';

  private http = inject(HttpClient);
  private tokenStorageService = inject(TokenStorageService);
  private router = inject(Router);


  login(userCredentials: UserCredentials): Observable<AuthTokenResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`)
    });

    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', userCredentials.email)
      .set('password', userCredentials.password)

    return this.http.post<AuthTokenResponse>(this.baseUrl, body.toString(), { headers })
      .pipe(
        tap(res => {
        })
      );
  }

  refreshToken(): Observable<AuthTokenResponse | null> {
    const refreshToken = localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');
    if (!refreshToken) {
      return of(null);
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`)
    });

    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refreshToken);
    return this.http.post<any>(this.baseUrl, body.toString(), { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400 || error.status === 401) {
            this.tokenStorageService.remove();
            this.router.navigate(['/auth/login']);
          } else {
            console.error('Erro no refresh token', error);
          }
          return of(null);
        })
      );
  }


  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey) || sessionStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): Observable<string | null> {
    const refreshToken = localStorage.getItem(this.refreshTokenKey) || sessionStorage.getItem(this.refreshTokenKey);
    return of(refreshToken);
  }

  isTokenExpired(): boolean {
    const expiresAt =
      localStorage.getItem(this.expiresAtKey) || sessionStorage.getItem(this.expiresAtKey);
    return expiresAt ? Date.now() > +expiresAt : true;
  }

  logout() {
    //TODO comunicar backend quando necessário.
    return of({})
  }

  getCurrentUser(): Observable<User | null> {
    const token = this.getAccessToken();
    if (!token) return of(null);

    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);

      return of({
        email: payload.username // ou payload.email
      });
    } catch (e) {
      console.error('Erro ao decodificar token', e);
      return of(null);
    }
  }
}
