import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Post} from "../../modules/blog/model/post";
import {BehaviorSubject, Subject, takeUntil, tap} from "rxjs";
import {Comment} from "../../modules/blog/model/comment";
import {CommentService} from "../../modules/blog/services/comment/comment.service";
import {CommentsAmountStateEnum} from "../../enums/comments-amount-state.enum";

@Component({
  selector: 'app-number-of-comments',
  templateUrl: './number-of-comments.component.html',
  styleUrls: ['./number-of-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberOfCommentsComponent implements OnInit {

  @Input() blogPost: Post | undefined;

  // Comments related
  commentsAmountStateEnum = CommentsAmountStateEnum;
  numberOfCommentsState: BehaviorSubject<CommentsAmountStateEnum> = new BehaviorSubject<CommentsAmountStateEnum>(CommentsAmountStateEnum.NONE);
  comments$: BehaviorSubject<Comment[]> = new BehaviorSubject<any[]>([]);

  // To destroy all observables on destroy
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  destroy$ = new Subject<boolean>();

  constructor(private commentService: CommentService) {}

  get notLoading(): boolean {
    return !this.loading$.value;
  }

  ngOnInit(): void {
    this.loadCommentsFromBlogPost();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  trackByComment(index: Number, comment: Comment): Number {
    return comment.id || index;
  }

  loadCommentsFromBlogPost(): void {
    // I'm betting there is a better way to deal with this kind of things
    // I'll dig into it later. I'm not sure the Input complain about undefined
    // was something I had to handle in the past
    if (!this.blogPost) return;

    this.commentService.getCommentsFromPost(this.blogPost.id)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.loading$.next(false)),
        tap((comments) => {
          if (comments.length === 1) {
            this.numberOfCommentsState.next(CommentsAmountStateEnum.SINGLE);
          } else if (comments.length > 1) {
            this.numberOfCommentsState.next(CommentsAmountStateEnum.MULTIPLE);
          }
        }),
      )
      .subscribe((comments) => this.comments$.next(comments) );
  }

}
