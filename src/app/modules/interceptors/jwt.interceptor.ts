import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthService } from "../shared/services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) 
    {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.getToken() != null) {
            // this.authenticationService.verifyTokenTime();
            const clonedReq = req.clone({
                headers: req.headers.set('esp-token', this.authService.getToken())
            });
            return next.handle(clonedReq).pipe(
                tap(
                    succ => { },
                    err => {
                        if (err.status == 401) this.authService.logout();
                    }
                )
            )
        }
        else return next.handle(req.clone());
    }
}