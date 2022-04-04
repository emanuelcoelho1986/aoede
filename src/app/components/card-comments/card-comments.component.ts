import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Comment} from "../../modules/blog/model/comment";
import {CommentsAmountStateEnum} from "../../enums/comments-amount-state.enum";
import {BehaviorSubject, Observable, Subject, takeUntil} from "rxjs";
import {map} from "rxjs/operators";
import {BlogPostService} from "../../services/blog-post.service";

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
})
export class CardCommentsComponent {
  commentsAmountStateEnum = CommentsAmountStateEnum;

  constructor(private blogPostService: BlogPostService) { }

  get mappedComments(): Observable<Comment[]> {
    return this.blogPostService.comments$.pipe(
      // map and transform to Comment Tree
      map((comments) => this.createCommentTree(comments))
    )
  }

  get numberOfCommentsState$(): Observable<CommentsAmountStateEnum> {

    return this.mappedComments.pipe(
      map(comments => {
        const numberOfComments = comments.length;

        if(!numberOfComments) return CommentsAmountStateEnum.NONE;
        if(numberOfComments === 1) return CommentsAmountStateEnum.SINGLE;

        return CommentsAmountStateEnum.MULTIPLE;
      })
    )

  }

  trackByCommentId(index: number, comment: Comment): Number {
    return comment.id || 0;
  }

  /**
   * Generate the comment tree
   * @param comments
   * @param parentId
   * @private
   */
  private createCommentTree(comments: Comment[], parentId: Number | null = null): Comment[] {
    // Since we have a flat structure in the beginning I can just map them to make it easy to get
    // the comments tree
    const commentsMap = new Map(comments.map((comment) => [comment.id, comment]));
    const commentsTree: Comment[] = [];

    commentsMap.forEach((comment) => {
      // Init the comments array on each comment
      comment.comments = [];

      if (comment.parent_id) {
        const parentComment = commentsMap.get(comment.parent_id);

        if (parentComment) {
          // I assume that all nodes have already a property children based on the data structure I created
          // from the API response
          parentComment.comments.push(comment);
        }
      } else {
        commentsTree.push(comment);
      }
    });

    return commentsTree;
  }
}
