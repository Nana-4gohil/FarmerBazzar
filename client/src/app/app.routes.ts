import { Routes } from '@angular/router';
import { LoginComponent } from '../Pages/login/login.component';
import { SignupComponent } from '../Pages/signup/signup.component';
import { DashboardComponent } from '../Pages/dashboard/dashboard.component';
import { CropComponent } from '../Components/crop/crop.component';


export const routes: Routes = [
    {
        path:'',
        component:CropComponent
    },
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
        component:DashboardComponent
    }

];
