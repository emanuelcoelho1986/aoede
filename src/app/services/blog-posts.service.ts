import {compareAsc, parseISO} from 'date-fns'

import {Injectable} from '@angular/core';
import {PostService} from "../modules/blog/services/post/post.service";
import {map} from 'rxjs/operators'
import {SortByEnum} from "../enums/sort-by.enum";

@Injectable({
  providedIn: 'root'
})
export class BlogPostsService {

  constructor(private postService: PostService) {
  }

  // I'll ignore the parameter for now but this is how I would handle sorting
  // Use an enum, create an external handler for sorting and handle the sort based on the enum value
  getBlogPosts(sortBy = SortByEnum.DATE_DESC) {
    return this.postService.getAllPosts()
      .pipe(
        // in case we start receiving it out of order, or we want to order it by something
        map(posts => posts.sort((a, b) => compareAsc(parseISO(`${a.publish_date}`), parseISO(`${b.publish_date}`))))
      )
  }
}
