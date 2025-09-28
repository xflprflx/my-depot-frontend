import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { makeEnvironmentProviders } from "@angular/core";
import { setAuthTokenInterceptor } from "./auth/interceptors/set-auth-token-interceptor";
import { provideAuth } from "./auth/provide-auth"

export function provideCore() {
  return makeEnvironmentProviders([
    provideAuth(),
    provideHttpClient(withInterceptors([setAuthTokenInterceptor])),

  ]);
}