import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "../components/not-found/not-found.component";
import {BlogPostsComponent} from "../components/blog-posts/blog-posts.component";
import {BlogPostResolver} from "../resolvers/blog-post-resolver.service";
import {BlogPostComponent} from "../components/blog-post/blog-post.component";

const routes: Routes = [
  {
    path: 'posts',
    component: BlogPostsComponent,
    // Maybe I could leave the navigation to details as children,
    // but I'll go with a != one
    /*
    children: [
      {
        path: ':id/:slug'
      }
    ]
    */
  },
  // Feels like reddit this way
  {
    path: 'p/:slug/:id',
    component: BlogPostComponent,
    resolve: {
      blogPost: BlogPostResolver
    }
  },

  // Posts are the default route
  {path: '', redirectTo: 'posts', pathMatch: 'full'},

  // Well... a not found courtesy of our WebDeveloper fellas and codepen
  // the main author is in not-found folder component as a comment
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
