import {KbmAuthConfig} from "auth";

export const authConfig: KbmAuthConfig = {
  issuer: 'http://localhost:8081/realms/Main',
  redirectUri: `${window.location.origin}`,
  silentRefreshRedirectUri: `${window.location.origin}/assets/silent-refresh.html`,
  clientId: 'fe',
  requireHttps: false,
  scope: 'openid',
  responseType: 'code',
}



