import {HttpInterceptorFn} from "@angular/common/http";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {AUTH_CONFIG} from "./auth.config";

export function tokenInterceptor(): HttpInterceptorFn {
  return (req, next) => {
    const authService = inject(AuthService);
    const cfg = inject(AUTH_CONFIG);
    if (!req.url.includes(cfg.issuer as string)) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authService.accessToken()}`,
        },
      });
    }
    return next(req);
  };
}


export function organizationInterceptor(): HttpInterceptorFn {
  return (req, next) => {
    const {store: {data: {currentTenant}}} = inject(AuthService);
    const cfg = inject(AUTH_CONFIG);
    if (currentTenant?.organizationId) {
      if (!req.url.includes(cfg.issuer as string)) {
        req = req.clone({
          setHeaders: {
            'X-OrganizationId': String(currentTenant.organizationId),
          },
        });
      }
    }
    return next(req);
  };
}
