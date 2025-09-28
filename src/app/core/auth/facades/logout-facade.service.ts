import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoggedInUserStoreService } from '../stores/logged-in-user-store.service';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutFacadeService {
  authService = inject(AuthService);
  tokenStorageService = inject(TokenStorageService);
  loggedInUserStoreService = inject(LoggedInUserStoreService);

  logout() {
    return this.authService.logout()
      .pipe(
        tap(() => this.tokenStorageService.remove()),
        tap(() => this.loggedInUserStoreService.logout())
      )
  }
}
