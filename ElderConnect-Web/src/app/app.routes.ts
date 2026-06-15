import { Routes } from '@angular/router';
import { SignIn } from './views/account/sign-in/sign-in';
import { SignUp } from './views/account/sign-up/sign-up';
import { MyProfile } from './views/account/my-profile/my-profile';
import { Help } from './views/pages/help/help';
import { Home } from './views/pages/home/home';
import { Main } from './views/pages/main/main';
import { UserList } from './views/pages/user/user-list/user-list';
import { UserEdit } from './views/pages/user/user-edit/user-edit';
import { UserDetail } from './views/pages/user/user-detail/user-detail';
import { NotFound } from './views/not-found/not-found';

export const routes: Routes = [
    {
        path: 'account/sign-in',
        component: SignIn
    },
    {
        path: 'account/sign-up',
        component: SignUp
    },
    {
        path: 'account/my-profile',
        component: MyProfile
    },
    {
        path: 'help',
        component: Help
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'main',
        component: Main
    },
    {
        path: 'user/list',
        component: UserList
    },
    {
        path: 'user/edit',
        component: UserEdit
    },
    {
        path: 'user/detail',
        component: UserDetail
    },
    {
        path: '**',
        component: NotFound
    },
];