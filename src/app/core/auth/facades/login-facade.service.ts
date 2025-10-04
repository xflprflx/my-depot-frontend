import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { UserCredentials } from '../interfaces/user-credentials';
import { LoggedInUserStoreService } from '../stores/logged-in-user-store.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginFacadeService {
  private readonly authService = inject(AuthService);
  private readonly loggedInUserStoreService = inject(LoggedInUserStoreService);

  login(userCredentials: UserCredentials) {
    return this.authService.login(userCredentials).pipe(tap(user => this.loggedInUserStoreService.setUser(user!)));
  }

  refreshToken() {
    return this.authService.refreshToken().pipe(
      tap(user => this.loggedInUserStoreService.setUser(user!))
    );
  }

}
