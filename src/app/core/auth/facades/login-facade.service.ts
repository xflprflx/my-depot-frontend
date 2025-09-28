import { inject, Injectable } from '@angular/core';
import { pipe, tap, switchMap, filter } from 'rxjs';
import { UserCredentials } from '../interfaces/user-credentials';
import { LoggedInUserStoreService } from '../stores/logged-in-user-store.service';
import { AuthService } from '../services/auth.service';
import { AuthTokenResponse } from '../interfaces/auth-token-response';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginFacadeService {
  private readonly authService = inject(AuthService);
  private readonly tokenStorageService = inject(TokenStorageService);
  private readonly loggedInUserStoreService = inject(LoggedInUserStoreService);

  login(userCredentials: UserCredentials) {
    return this.authService.login(userCredentials).pipe(this.createUserSession(userCredentials.remember));
  }

  refreshToken() {
    return this.authService.refreshToken().pipe(
      filter((res): res is AuthTokenResponse => res !== null), // remove o null
      this.createUserSession() // agora só recebe AuthTokenResponse
    );
  }

  private createUserSession(remember?: boolean) {
    return pipe(
      tap((res: AuthTokenResponse) => {
        if(remember !== undefined) {
          this.tokenStorageService.set(res, remember)
        } else {
          this.tokenStorageService.setRefresh(res)
        }

      }),
      switchMap((res) => this.authService.getCurrentUser()),
      tap((user) => {
        this.loggedInUserStoreService.setUser(user!)
      })
    )
  }
}
