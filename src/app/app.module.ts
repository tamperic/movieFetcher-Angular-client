import { BrowserModule } from "@angular/platform-browser";
import { HttpClient, HttpClientModule } from "@angular/common/http"; // Simplified API for Angular apps
import { NgModule } from "@angular/core";

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