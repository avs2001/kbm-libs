import {ModuleWithProviders, NgModule} from '@angular/core';
import {AuthService} from "./auth.service";
import {OAuthModule} from "angular-oauth2-oidc";


@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    const {providers, ngModule} = OAuthModule.forRoot();
    return {
      ngModule: ngModule,
      providers: providers?.concat([AuthService])
    };
  }
}
