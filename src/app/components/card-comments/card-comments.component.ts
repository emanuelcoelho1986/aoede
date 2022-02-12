import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../../modules/blog/model/post";
import {CommentService} from "../../modules/blog/services/comment/comment.service";
import {BehaviorSubject, Subject, takeUntil, tap} from "rxjs";
import {Comment} from "../../modules/blog/model/comment";

export enum CommentsAmountStateEnum {
  NONE,
  SINGLE,
  MULTIPLE
}

/**
 * I'm seeing this one being the following:
 *
 * 1 - Contains the number of comments as link
 * 2 - Show the first 2 comments
 * 3 - If it has more than 2 comments will have a view more because we might have replied from replies
 */
@Component({
  selector: 'app-card-comments',
  templateUrl: './card-comments.component.html',
  styleUrls: ['./card-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardCommentsComponent implements OnInit, OnDestroy {

  @Input() blogPost: Post | undefined;

  // Comments related
  commentsAmountStateEnum = CommentsAmountStateEnum;
  numberOfCommentsState: BehaviorSubject<CommentsAmountStateEnum> = new BehaviorSubject<CommentsAmountStateEnum>(CommentsAmountStateEnum.NONE);
  comments$: BehaviorSubject<Comment[]> = new BehaviorSubject<any[]>([]);

  // To destroy all observables on destroy
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  destroy$ = new Subject<boolean>();

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    // I'm betting there is a better way to deal with this kind of things
    // I'll dig into it later. I'm not sure the Input complain about undefined
    // was something I had to handle in the past
    if(!this.blogPost) return;

    this.commentService.getCommentsFromPost(this.blogPost.id)
      .pipe(
        takeUntil(this.destroy$),
        tap(()=>this.loading$.next(false)),
        tap((comments) => {
          if(comments.length === 1) {
            this.numberOfCommentsState.next(CommentsAmountStateEnum.SINGLE);
          } else if (comments.length > 1) {
            this.numberOfCommentsState.next(CommentsAmountStateEnum.MULTIPLE);
          }
        }),
      )
      .subscribe((comments) => {
        console.log('Comments from: ', this.blogPost?.id, comments);
        this.comments$.next(comments);
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  trackByComment(index: Number, comment: Comment): Number {
    return comment.id || index;
  }

  get notLoading(): boolean {
    return !this.loading$.value;
  }

}
