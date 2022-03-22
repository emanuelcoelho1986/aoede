import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './routes/app-routing.module';
import {AppComponent} from './app.component';
import {BlogModule} from './modules/blog/blog.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BlogCardComponent} from "./components/blog-card/blog-card.component";
import {SafePipe} from './pipes/safe.pipe';
import {CardCommentsComponent} from './components/card-comments/card-comments.component';
import {PageLoadingComponent} from './components/page-loading/page-loading.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {BlogPostsComponent} from './components/blog-posts/blog-posts.component';
import {BlogPostComponent} from './components/blog-post/blog-post.component';
import {NumberOfCommentsComponent} from './components/number-of-comments/number-of-comments.component';
import {CardCommentComponent} from './components/card-comment/card-comment.component';
import {CardCommentActionsComponent} from './components/card-comment-actions/card-comment-actions.component';


@NgModule({
  declarations: [
    /* Components */
    AppComponent,
    BlogCardComponent,

    CardCommentsComponent,
    PageLoadingComponent,
    NotFoundComponent,
    BlogPostsComponent,
    BlogPostComponent,

    /* Pipes */
    SafePipe,
    NumberOfCommentsComponent,
    CardCommentComponent,
    CardCommentActionsComponent,
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
