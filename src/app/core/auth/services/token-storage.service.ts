import { inject, Injectable } from '@angular/core';
import { LocalStorageToken } from '../tokens/local-storage';
import { SessionStorageToken } from '../tokens/session-storage';
import { AuthTokenResponse } from '../interfaces/auth-token-response';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private readonly accessTokenKey = 'access_token';
  private readonly refreshTokenKey = 'refresh_token';
  private readonly tokenTypeKey = 'token_type';
  private readonly expiresAtKey = 'expires_in';

  private localStorageToken = inject(LocalStorageToken);
  private sessionStorageToken = inject(SessionStorageToken);

  /**
   * Salva os tokens.
   * @param data - objeto AuthTokenResponse
   * @param rememberMe - se true, salva no localStorage, senão sessionStorage
   */
  set(data: AuthTokenResponse, rememberMe?: boolean) {
    const storage = rememberMe ? this.localStorageToken : this.sessionStorageToken;

    storage.setItem(this.accessTokenKey, data.access_token);
    storage.setItem(this.refreshTokenKey, data.refresh_token);
    storage.setItem(this.tokenTypeKey, data.token_type);
    storage.setItem(this.expiresAtKey, (Date.now() + data.expires_in * 1000).toString());
  }

  setRefresh(data: AuthTokenResponse) {
    const storage = this.getActiveStorage();

    storage!.setItem(this.accessTokenKey, data.access_token);
    storage!.setItem(this.refreshTokenKey, data.refresh_token);
    storage!.setItem(this.tokenTypeKey, data.token_type);
    storage!.setItem(this.expiresAtKey, (Date.now() + data.expires_in * 1000).toString());
  }

  /**
   * Retorna todos os tokens armazenados
   */
  get(): AuthTokenResponse | null {
    const storage = this.getActiveStorage();
    if (!storage) return null;

    const access_token = storage.getItem(this.accessTokenKey);
    const refresh_token = storage.getItem(this.refreshTokenKey);
    const token_type = storage.getItem(this.tokenTypeKey);
    const expires_atStr = storage.getItem(this.expiresAtKey);

    if (!access_token || !refresh_token || !token_type || !expires_atStr) return null;

    return {
      access_token,
      refresh_token,
      token_type,
      expires_in: Number(expires_atStr),
    };
  }

  /**
   * Verifica se há tokens válidos
   */
  has(): boolean {
    const data = this.get();
    return !!data && (data.expires_in > Date.now());
  }

  /**
   * Remove todos os tokens
   */
  remove(): void {
    this.localStorageToken.removeItem(this.accessTokenKey);
    this.localStorageToken.removeItem(this.refreshTokenKey);
    this.localStorageToken.removeItem(this.tokenTypeKey);
    this.localStorageToken.removeItem(this.expiresAtKey);

    this.sessionStorageToken.removeItem(this.accessTokenKey);
    this.sessionStorageToken.removeItem(this.refreshTokenKey);
    this.sessionStorageToken.removeItem(this.tokenTypeKey);
    this.sessionStorageToken.removeItem(this.expiresAtKey);
  }

  /**
   * Decide qual storage está ativo
   */
  private getActiveStorage(): Storage | null {
    if (this.localStorageToken.getItem(this.accessTokenKey)) return this.localStorageToken;
    if (this.sessionStorageToken.getItem(this.accessTokenKey)) return this.sessionStorageToken;
    return null;
  }
}
