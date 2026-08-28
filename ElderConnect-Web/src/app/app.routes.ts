import { Routes } from '@angular/router';

// Account
import { ForgotPassword } from './views/account/forgot-password/forgot-password';
import { Profile } from './views/account/my-profile/my-profile';
import { SignIn } from './views/account/sign-in/sign-in';
import { SignUp } from './views/account/sign-up/sign-up';
import { SignUpCaregiver } from './views/account/sign-up-caregiver/sign-up-caregiver';

// Pages
import { CaregiverDashboard } from './views/pages/caregiver-dashboard/caregiver-dashboard';
import { ElderDashboard } from './views/pages/elder-dashboard/elder';
import { Help } from './views/pages/help/help';
import { Home } from './views/pages/home/home';
import { Medications } from './views/pages/medications/medication';
import { ProfileCaregiver } from './views/pages/profile-caregiver/profile-caregiver';
import { SearchCaregiver } from './views/pages/search-caregiver/search-caregiver';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    // Rotas de Páginas Principais e Dashboards
    { path: 'home', component: Home },
    { path: 'dashboard/elder', component: ElderDashboard },
    { path: 'dashboard/caregiver', component: CaregiverDashboard },
    { path: 'dashboard/search-caregiver', component: SearchCaregiver },
    { path: 'dashboard/medications', component: Medications },
    { path: 'dashboard/profile', component: Profile },
    { path: 'profile-caregiver', component: ProfileCaregiver },
    { path: 'help', component: Help },

    // Rotas de Autenticação / Conta
    { path: 'account/sign-in', component: SignIn },
    { path: 'account/sign-up', component: SignUp },
    { path: 'account/complete-profile', component: SignUpCaregiver },
    { path: 'account/forgot-password', component: ForgotPassword },

    // Fallback
    { path: '**', redirectTo: 'home' }
];