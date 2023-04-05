import {inject, Injectable} from "@angular/core";
import {AUTH_CONFIG} from "./auth.config";
import {OAuthService} from "angular-oauth2-oidc";

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly _config = inject(AUTH_CONFIG);
  private readonly _oAuth = inject(OAuthService);

  constructor() {
    this._oAuth.configure(this._config);
    this._oAuth.setupAutomaticSilentRefresh();
  }

  get accessToken() {
    return this._oAuth.getAccessToken();
  }

  login() {
    return this._oAuth.loadDiscoveryDocumentAndLogin();
  }

  logout() {
    return this._oAuth.revokeTokenAndLogout();
  }

  get events() {
    return this._oAuth.events
  }
}
