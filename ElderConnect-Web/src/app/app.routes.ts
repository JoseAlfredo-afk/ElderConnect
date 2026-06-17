import { Routes } from '@angular/router';
import { SignIn } from './views/account/sign-in/sign-in';
import { SignUp } from './views/account/sign-up/sign-up';
import { Home } from './views/pages/home/home';
import { NotFound } from './views/not-found/not-found';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'account/sign-in',
        component: SignIn
    },
    {
        path: 'account/sign-up',
        component: SignUp
    },
    {
        path: '**',
        component: NotFound
    },
];