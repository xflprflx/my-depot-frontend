import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AuthTokenStorageService } from '../services/auth-token-storage.service';
import { AuthService } from '../services/auth.service';
import { LoggedInUserStoreService } from '../store/logged-in-user-store.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutFacadeService {
  authService = inject(AuthService);
  authTokenStorageService = inject(AuthTokenStorageService);
  loggedInUserStoreService = inject(LoggedInUserStoreService);

  logout() {
    return this.authService.logout()
      .pipe(
        tap(() => this.authTokenStorageService.remove()),
        tap(() => this.loggedInUserStoreService.logout())
      )
  }
}
