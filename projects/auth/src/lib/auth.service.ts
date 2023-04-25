import {inject, Injectable} from "@angular/core";
import {AUTH_CONFIG, AUTH_STORE} from "./auth.config";
import {OAuthService} from "angular-oauth2-oidc";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {AuthState, UserInfo, UserTenants} from "./model";
import {AuthStore} from "./auth.store";


@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly _config = inject(AUTH_CONFIG);
  private readonly _oAuth = inject(OAuthService);
  private readonly http = inject(HttpClient);

  protected _store: AuthStore<AuthState> = inject(AUTH_STORE);

  get store(): AuthStore<AuthState> {
    return this._store;
  }

  constructor() {
    this._oAuth.configure(this._config);
    this._oAuth.setupAutomaticSilentRefresh();
  }


  accessToken() {
    return this._oAuth.getAccessToken();
  }

  protected getBearerToken() {
    return `Bearer ${this.accessToken()}`;
  }

  protected getHeaders() {
    return new HttpHeaders({
      Authorization: this.getBearerToken()
    })
  }

  getTenants() {
    return firstValueFrom(this.http.get<UserTenants>('/api/common/user-tenants', {
      headers: this.getHeaders()
    }));
  }

  getUserInfo(organizationId: number) {
    const headers = this.getHeaders().append('X-OrganizationId', `${organizationId}`);
    return firstValueFrom(this.http.get<UserInfo>('/api/common/info', {headers}));
  }

  async login() {
    return this._oAuth.loadDiscoveryDocumentAndLogin().then(async (isLogged) => {
      if (isLogged) {
        const {result: userTenants} = await this.getTenants();
        const userInfo = await this.getUserInfo(userTenants[0].organizationId);
        this._store.update({...userInfo, userTenants, currentTenant: userTenants[0], isLogged: true});
      }
      return isLogged;
    }).catch(error => console.log('error', error))
  }

  logout() {
    return this._oAuth.revokeTokenAndLogout();
  }

  get events() {
    return this._oAuth.events
  }
}
