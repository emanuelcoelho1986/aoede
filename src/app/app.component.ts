import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {BehaviorSubject, delay, Subject, takeUntil, tap} from "rxjs";
import {Post} from "./modules/blog/model/post";
import {BlogPostsService} from "./services/blog-posts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Aeode - Muse of voice and Song';

  posts: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

  loading$ = new BehaviorSubject(false);
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private titleService: Title, private blogPostsService: BlogPostsService) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);

    this.loading$.next(true);
    this.blogPostsService.getBlogPosts()
      .pipe(
        takeUntil(this.destroy$),
        delay(1000),
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
