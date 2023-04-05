import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {provideHttpClient} from "@angular/common/http";
import {provideKbmAuth} from "../../auth/src/lib/auth.config";
import {AUTH_CONFIG} from "auth";
import {authConfig} from "./app/config";

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideKbmAuth(),
    {provide: AUTH_CONFIG, useValue: authConfig},
  ]
}).catch(err => console.error(err));
