import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './routes/app-routing.module';
import {AppComponent} from './app.component';
import {BlogModule} from './modules/blog/blog.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {BlogCardComponent} from "./components/blog-card/blog-card.component";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {SafePipe} from './pipes/safe.pipe';
import {CardCommentsComponent} from './components/card-comments/card-comments.component';

@NgModule({
  declarations: [
    /* Components */
    AppComponent,
    BlogCardComponent,

    /* Pipes */
    SafePipe,
    CardCommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    BlogModule,

    BrowserAnimationsModule,

    MatProgressBarModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
