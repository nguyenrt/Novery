// Declarations
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { CollectionComponent } from './collection/collection.component';

// Imports
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MdTabsModule, MdTooltipModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2TableModule } from 'ng2-table/ng2-table';

// Other
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './config/app.config';

export function initConfig(config: AppConfig) {
  return () => config.load();
}

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent
    // ,
    // CollectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgbModule.forRoot(),
    MdTabsModule,
    BrowserAnimationsModule,
    Ng2TableModule,
    MdTooltipModule
  ],
  providers: [
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: initConfig, deps: [AppConfig], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
