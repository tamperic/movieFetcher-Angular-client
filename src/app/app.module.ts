import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, provideHttpClient } from "@angular/common/http"; // Simplified API for Angular apps
import { NgModule } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";

// import { AppRoutigModule } from './app-routing.module';
import { App } from "./app";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { UserRegistrationForm } from "./user-registration-form/user-registration-form";

@NgModule({
    declarations: [ ],
    imports: [
        App,
        UserRegistrationForm,
        BrowserModule,
        // AppRoutigModule,
        FormsModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule, // Material Design card component to display the various movies on welcome screen
        MatInputModule,
        MatFormFieldModule,
        MatSnackBarModule,
        BrowserAnimationsModule
    ],
    providers: [provideHttpClient()],
    // bootstrap: [App]
})

export class AppModule { }
