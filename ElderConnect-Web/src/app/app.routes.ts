import { Routes } from '@angular/router';
import { SignIn } from './views/account/sign-in/sign-in';
import { SignUp } from './views/account/sign-up/sign-up';
import { Home } from './views/pages/home/home';
import { CompleteProfile } from './views/account/sign-up-caregiver/sign-up-caregiver';
import { ElderDashboard } from './views/pages/elder-dashboard/elder';
import { SearchCaregivers } from './views/pages/search-caregiver/search-caregiver';
import { Medications } from './views/pages/medications/medication';

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
        path: 'account/complete-profile',
        component: CompleteProfile
    },
    {
        path: 'dashboard/elder',
        component: ElderDashboard
    },
    {
        path: 'dashboard/search-caregiver',
        component: SearchCaregivers
    },
    {
        path: 'dashboard/medications',
        component: Medications
    }
];