import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from 'ng-fullcalendar';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// ng build --deploy-url https://incyte.sharepoint.com/sites/CT/SiteAssets/FullCalendar/ --base-href https://incyte.sharepoint.com/sites/CT/Pages/Home.aspx