import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import 'zone.js'; // Required for Angular change detection


  bootstrapApplication(App, {
    providers: [
      provideHttpClient(withInterceptorsFromDi()),
      importProvidersFrom(BrowserAnimationsModule, MatDialogModule, MatSnackBarModule)
    ],
  });