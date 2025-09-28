import { inject, provideAppInitializer } from "@angular/core";
import { of } from "rxjs";
import { LoginFacadeService } from "../facades/login-facade.service";
import { TokenStorageService } from "../services/token-storage.service";

export function provideLoggedInUser() {
    return provideAppInitializer(() => {
        
        const tokenStorageService = inject(TokenStorageService);
      
        if (!tokenStorageService.has()) {
            return of();
        }


        const loginFacadeService = inject(LoginFacadeService);

        return loginFacadeService.refreshToken();
    });

}