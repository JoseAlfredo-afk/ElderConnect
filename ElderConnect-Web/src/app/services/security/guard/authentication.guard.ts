import { inject, Inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Authentication } from "../authentication";


export const authenticationGuard: CanActivateFn = () => {

    const router = inject(Router);
    const authService = inject(Authentication);

    if (authService.usuarioLogado()) {
        return true;
    }

    router.navigate(['account/sign-in']);
    return false;

}