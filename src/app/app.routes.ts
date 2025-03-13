import { Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { ManagerComponent } from './pages/manager/manager.component';

export const routes: Routes = [
    { path: 'user', component: UserComponent },
    { path: 'manager', component: ManagerComponent },
];
