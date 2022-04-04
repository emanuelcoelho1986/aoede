import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Comment} from "../../modules/blog/model/comment";
import {BehaviorSubject, mergeMap} from "rxjs";
import {IFormComment} from "../../models/IFormComment";
import {CommentService} from "../../modules/blog/services/comment/comment.service";
import {BlogPostService} from "../../services/blog-post.service";

@Component({
  selector: 'app-card-comment',
  templateUrl: './card-comment.component.html',
  styleUrls: ['./card-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardCommentComponent {
  @Input() comment: Comment | undefined;

  showReplyForm$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private commentService: CommentService, private blogPostService: BlogPostService) {
  }

  get hasComments(): boolean {
    return !this.comment ? false : this.comment.comments?.length > 0;
  }

  get comments(): Comment[] {
    return this.comment?.comments || [];
  }

  userDidPressReplyButton() {
    this.showReplyForm$.next(true);
  }

  userDidCancelReply() {
    this.showReplyForm$.next(false);
  }

  userDidSubmitForm(withValues: IFormComment) {
    const commentData: Partial<Comment> = {
      postId: this.comment?.postId,
      parent_id: this.comment?.id,
      user: withValues.author,
      // There must be a better way to do this.
      date: new Date().toISOString().slice(0, 10),
      content: withValues.comment
    };

    this.commentService.comment(commentData)
      .pipe(
        mergeMap(newComment => this.blogPostService.loadComments(commentData.postId))
      )
      .subscribe({
        next: (newCommentsArray) => {
          this.blogPostService.comments$.next(newCommentsArray);
          this.showReplyForm$.next(false)
        },
        error: (err) => console.error(err)
      })
  }
}
