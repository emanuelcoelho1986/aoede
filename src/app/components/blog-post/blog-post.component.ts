import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../modules/blog/model/post";
import {BehaviorSubject, Observable, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, OnDestroy {

  blogPost$: BehaviorSubject<Post | undefined> = new BehaviorSubject<Post | undefined>(undefined);

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    (this.route.data as Observable<{ blogPost: Post }>)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (blogPost) => this.blogPost$.next(blogPost.blogPost)
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
