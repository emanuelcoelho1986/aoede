import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Post} from "../modules/blog/model/post";
import {Observable} from "rxjs";
import {PostService} from "../modules/blog/services/post/post.service";

@Injectable({
  providedIn: 'root'
})
export class BlogPostResolver implements Resolve<Post>{

  constructor(private postsService: PostService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post> | Promise<Post> | Post {
    const withId = new Number(route.paramMap.get('id'));
    return this.postsService.getPost(withId);
  }

}
