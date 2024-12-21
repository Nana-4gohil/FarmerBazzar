import { Routes } from '@angular/router';
import { LoginComponent } from '../Pages/login/login.component';
import { SignupComponent } from '../Pages/signup/signup.component';
import { DashBoardComponent } from '../Pages/dash-board/dash-board.component';

export const routes: Routes = [
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'signup',
        component:SignupComponent
    },
    {
        path:'dashboard',
        component:DashBoardComponent
    }

];
