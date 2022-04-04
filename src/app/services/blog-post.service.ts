import { Injectable } from '@angular/core';
import {CommentService} from "../modules/blog/services/comment/comment.service";
import {Comment} from "../modules/blog/model/comment";
import {BehaviorSubject, Observable, tap} from "rxjs";


/**
 * Sort by date function
 * New first
 * @param comment
 * @param nextComment
 */
export function sortByDate(comment: Comment, nextComment: Comment): number {
  const commentDate = new Date(comment.date as string);
  const nextCommentDate = new Date(nextComment.date as string);

  if (commentDate.getTime() < nextCommentDate.getTime()) return 1;
  if (commentDate.getTime() > nextCommentDate.getTime()) return -1;

  return 0;
}

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  comments$: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);

  constructor(private commentService: CommentService) { }

  /**
   * Will load the comments from a given postId
   * @param fromPostId
   * @throws Error in case a fromPostId is not defined
   */
  loadComments(fromPostId: Number | undefined): Observable<Comment[]> {
    if (!fromPostId) throw new Error('Blog Post ID is not defined');

    return this.commentService.getCommentsFromPost(fromPostId)
      .pipe(
        // Save them in the local property
        tap(comments => this.comments$.next(comments))
      )
  }

  /**
   * Add a comment to a given post ID
   * @param postId The post ID
   * @param withValues The body of the comment. Here we should have what we required: a parentId if is a reply, an author and the content itself
   */
  addCommentTo(postId: Number | undefined, withValues: Partial<Comment>): Observable<Comment> {
    const fullCommentData: Partial<Comment> = {
      ...{
        postId: postId,
        // There must be a better way to do this.
        date: new Date().toISOString().slice(0, 10)
      },
      ...withValues
    };

    // Set Post ID
    withValues.postId = postId;

    return this.commentService.comment(fullCommentData)
  }
}
