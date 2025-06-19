import { BrowserModule } from "@angular/platform-browser";
import { HttpClient, HttpClientModule } from "@angular/common/http"; // Simplified API for Angular apps
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";

// import { AppRoutigModule } from './app-routing.module';
import { App } from "./app";

@NgModule({
    declarations: [
        App
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        // AppRoutigModule
    ],
    providers: [],
    bootstrap: [App]
})

export class AppModule { }