import { inject, provideAppInitializer } from "@angular/core";
import { LoginFacadeService } from "../facades/login-facade.service";
import { LoggedInUserStoreService } from "../stores/logged-in-user-store.service";
import { of } from "rxjs";
import { AuthService } from "../services/auth.service";

export function provideLoggedInUser() {
  return provideAppInitializer(() => {
    const authService = inject(AuthService);
    
    if(authService.getUser() === null || undefined) {
      return of(null);
    }

    const loginFacadeService = inject(LoginFacadeService);
    return loginFacadeService.refreshToken();
  });
}
