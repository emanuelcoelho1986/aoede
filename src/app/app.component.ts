import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subject, take, takeUntil, tap} from "rxjs";
import {Post} from "./blog/model/post";
import {PostService} from "./blog/services/post/post.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'aoede';
  posts: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([])

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private postsService: PostService) { }

  ngOnInit(): void {
    this.postsService.getAll()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        (posts) => this.posts.next(posts)
      )
  }

  ngOnDestroy() {
    // An automated way to destroy observables
    // We need to "take them until" we destroy it
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
