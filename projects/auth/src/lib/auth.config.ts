import {AuthConfig, provideOAuthClient} from "angular-oauth2-oidc";
import {EnvironmentProviders, InjectionToken, makeEnvironmentProviders} from "@angular/core";
import {AuthService} from "./auth.service";

export type KbmAuthConfig = AuthConfig & {};
export const AUTH_CONFIG = new InjectionToken<KbmAuthConfig>('authConfig', {
  providedIn: 'root',
  factory: () => ({})
});


export function provideKbmAuth(): EnvironmentProviders {
  return makeEnvironmentProviders([
    AuthService,
    provideOAuthClient()
  ]);
}
