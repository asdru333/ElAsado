import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeModule } from './pages/home/home.module';
import { AboutModule } from './pages/about/about.module';
import { ContactModule } from './pages/contact/contact.module';
import { LoginModule } from './pages/login/login.module';
import { RegisterModule } from './pages/register/register.module';
import { ForgotPasswordModule } from './pages/forgotPassword/forgotPassword.module';
import { MenuModule } from './pages/menu/menu.module';
import { EntriesModule } from './pages/entries/entries.module';
import { MainDishesModule } from './pages/mainDishes/mainDishes.module';
import { DessertsModule } from './pages/desserts/desserts.module';
import { BeveragesModule } from './pages/beverages/beverages.module';
import { CartModule } from './pages/cart/cart.module';
import { Page404Module } from './pages/page404/page404.module';
import { MinimenuModule } from './components/minimenu/minimenu.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    AboutModule,
    ContactModule,
    LoginModule,
    RegisterModule,
    MenuModule,
    EntriesModule,
    MainDishesModule,
    DessertsModule,
    BeveragesModule,
    CartModule,
    Page404Module,
    MinimenuModule,
    ForgotPasswordModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent, NavbarComponent, FooterComponent]
})
export class AppModule { }
