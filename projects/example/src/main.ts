import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideKbmAuth} from "../../auth/src/lib/auth.config";
import {AUTH_CONFIG, AUTH_STORE, organizationInterceptor, tokenInterceptor} from "auth";
import {authConfig} from "./app/config";
import {Store} from "./app/store";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([tokenInterceptor(), organizationInterceptor()])
    ),
    provideKbmAuth(),
    {provide: AUTH_CONFIG, useValue: authConfig},
    {provide: AUTH_STORE, useFactory: () => new Store()},
  ]
}).catch(err => console.error(err));
