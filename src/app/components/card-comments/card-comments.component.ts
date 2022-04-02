import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NumberOfCommentsComponent} from "../number-of-comments/number-of-comments.component";
import {Observable} from "rxjs";
import {Comment} from "../../modules/blog/model/comment";
import {map} from "rxjs/operators";

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
export class CardCommentsComponent extends NumberOfCommentsComponent {

  get mappedComments$(): Observable<Comment[]> {
    return this.comments$.pipe(
      // map and transform to Comment Tree
      map((comments) => this.createCommentTree(comments))
    )
  }

  reloadComments(): void {
    this.loadCommentsFromBlogPost();
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
