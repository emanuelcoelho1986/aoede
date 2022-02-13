import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subject, takeUntil, tap} from "rxjs";
import {Post} from "../../modules/blog/model/post";
import {BlogPostsService} from "../../services/blog-posts.service";

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPostsComponent implements OnInit, OnDestroy {

  posts: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

  loading$ = new BehaviorSubject(false);
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private blogPostsService: BlogPostsService) { }

  ngOnInit() {
    this.loading$.next(true);
    this.blogPostsService.getBlogPosts()
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.loading$.next(false))
      )
      .subscribe((posts) => this.posts.next(posts))
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  trackedBy(index: Number, post: Post) {
    return post;
  }

}
