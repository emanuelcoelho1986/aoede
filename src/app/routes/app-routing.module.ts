import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "../components/not-found/not-found.component";
import {BlogPostsComponent} from "../components/blog-posts/blog-posts.component";

const routes: Routes = [
  { path: 'posts', component: BlogPostsComponent },
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
