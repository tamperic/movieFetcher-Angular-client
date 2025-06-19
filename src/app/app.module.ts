import { BrowserModule } from "@angular/platform-browser";
import { HttpClient, HttpClientModule } from "@angular/common/http"; // Simplified API for Angular apps
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
import { FetchApiData } from "./fetch-api-data";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        App,
        FetchApiData
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        // AppRoutigModule,
        FormsModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatSnackBarModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [App]
})

export class AppModule { }