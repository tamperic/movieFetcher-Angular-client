import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, provideHttpClient } from "@angular/common/http"; // Simplified API for Angular apps
import { NgModule } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { App } from "./app";
import { UserRegistrationForm } from "./user-registration-form/user-registration-form";
import { UserLoginForm } from "./user-login-form/user-login-form";
import { WelcomePage } from "./welcome-page/welcome-page";
import { MovieCard } from "./movie-card/movie-card";

export const appRoutes: Routes = [
    { path: 'welcome', component: WelcomePage },
    { path: 'movies', component: MovieCard },
    { path: '', redirectTo: 'welcome', pathMatch: 'prefix' }
];

@NgModule({
    declarations: [ ],
    imports: [
        App,
        UserRegistrationForm,
        UserLoginForm,
        BrowserModule,
        FormsModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule, 
        MatInputModule,
        MatFormFieldModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [provideHttpClient()],
    // bootstrap: [App]
})

export class AppModule { }
