import { InjectionToken } from "@angular/core";

export const SessionStorageToken = new InjectionToken<Storage>('Session Storage', {
    providedIn: 'root',
    factory: () => window.sessionStorage
})
