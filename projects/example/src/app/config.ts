import {KbmAuthConfig} from "auth";

export const authConfig: KbmAuthConfig = {
  issuer: 'https://identity.kinetiqx.integration.kebormed.com/auth/realms/Main',
  redirectUri: `${window.location.origin}`,
  silentRefreshRedirectUri: `${window.location.origin}/assets/silent-refresh.html`,
  clientId: 'frontend-client',
  requireHttps: false,
  scope: 'openid profile email offline_access',
  responseType: 'code',
  disableAtHashCheck: true,
}


/**/
