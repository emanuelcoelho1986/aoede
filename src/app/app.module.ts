import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './routes/app-routing.module';
import {AppComponent} from './app.component';
import {BlogModule} from './modules/blog/blog.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BlogCardComponent} from "./components/blog-card/blog-card.component";
import {SafePipe} from './pipes/safe.pipe';
import {CardCommentsComponent} from './components/card-comments/card-comments.component';
import { PageLoadingComponent } from './components/page-loading/page-loading.component';

@NgModule({
  declarations: [
    /* Components */
    AppComponent,
    BlogCardComponent,

    /* Pipes */
    SafePipe,
    CardCommentsComponent,
    PageLoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    BlogModule,

    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
