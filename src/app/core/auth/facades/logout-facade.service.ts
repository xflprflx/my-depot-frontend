import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoggedInUserStoreService } from '../stores/logged-in-user-store.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutFacadeService {
  authService = inject(AuthService);
  loggedInUserStoreService = inject(LoggedInUserStoreService);

  logout() {
    return this.authService.logout()
      .pipe(
        tap(() => this.loggedInUserStoreService.logout())
      )
  }
}
