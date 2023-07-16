import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCommonModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { HeaderComponent } from './layout/header/header.component';
import { AuthComponent } from './layout/auth/auth.component';
import { userFilesReducer } from './user-files/reducer';
import { UserFilesComponent } from './user-files/component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ userFiles: userFilesReducer }),
    MatCommonModule,

    HeaderComponent,
    AuthComponent,
    UserFilesComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
