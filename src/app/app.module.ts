import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MdTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { AppConfig } from './config/app.config';

export function initConfig(config: AppConfig) {
  return () => config.load();
}

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgbModule.forRoot(),
    MdTabsModule,
    BrowserAnimationsModule
  ],
  providers: [
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: initConfig, deps: [AppConfig], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
