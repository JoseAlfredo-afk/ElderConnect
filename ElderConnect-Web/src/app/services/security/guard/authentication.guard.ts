import { inject, Inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../user/auth";


export const authenticationGuard : CanActivateFn = () =>{

    const router = inject(Router);
    const authService = inject(AuthService);

    if (authService.usuarioLogado()){
        return true;
    }

    router.navigate(['account/sign-in']);
    return false;

}