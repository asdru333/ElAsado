import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgotPassword/forgotPassword.component';
import { MenuComponent } from './pages/menu/menu.component';
import { EntriesComponent } from './pages/entries/entries.component';
import { MainDishesComponent } from './pages/mainDishes/mainDishes.component';
import { DessertsComponent } from './pages/desserts/desserts.component';
import { Page404Component } from './pages/page404/page404.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);

const redirectToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'login', component: LoginComponent, ...canActivate(redirectToHome)},
  {path: 'register', component: RegisterComponent, ...canActivate(redirectToHome)},
  {path: 'forgotPassword', component: ForgotPasswordComponent, ...canActivate(redirectToHome)},
  {path: 'menu', component: MenuComponent},
  {path: 'menu/entries', component: EntriesComponent},
  {path: 'menu/mainDishes', component: MainDishesComponent},
  {path: 'menu/desserts', component: DessertsComponent},
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
