import {AuthConfig, provideOAuthClient} from "angular-oauth2-oidc";
import {EnvironmentProviders, InjectionToken, makeEnvironmentProviders} from "@angular/core";
import {AuthService} from "./auth.service";
import {AuthStore, DefaultAuthStore} from "./auth.store";
import {AuthState} from "./model";

export type KbmAuthConfig = AuthConfig & {};
export const AUTH_CONFIG = new InjectionToken<KbmAuthConfig>('authConfig', {
  providedIn: 'root',
  factory: () => ({})
});

export const AUTH_STORE = new InjectionToken<AuthStore<AuthState>>('authStore', {
  providedIn: "root",
  factory: () => new DefaultAuthStore()
})


export function provideKbmAuth(): EnvironmentProviders {
  return makeEnvironmentProviders([
    AuthService,
    provideOAuthClient()
  ]);
}

