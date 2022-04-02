import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../modules/blog/model/post";
import {BehaviorSubject, Observable, Subject, takeUntil} from "rxjs";
import {IFormComment} from "../../models/IFormComment";
import {CardCommentsComponent} from "../card-comments/card-comments.component";
import {CommentService} from "../../modules/blog/services/comment/comment.service";
import {Comment} from "../../modules/blog/model/comment";
import {CommentFormComponent} from "../comment-form/comment-form.component";

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, OnDestroy {

  @ViewChild(CardCommentsComponent)
  cardComments: CardCommentsComponent | undefined;

  @ViewChild(CommentFormComponent)
  commentForm: CommentFormComponent | undefined;

  blogPost$: BehaviorSubject<Post | undefined> = new BehaviorSubject<Post | undefined>(undefined);

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private commentService: CommentService) {}

  ngOnInit(): void {
    (this.route.data as Observable<{ blogPost: Post }>)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (blogPost) => this.blogPost$.next(blogPost.blogPost)
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  get blogPostId(): Number | undefined {
    return this.blogPost$.value?.id;
  }

  userDidSubmitForm(withData: IFormComment): void {
    const commentData: Partial<Comment> = {
      postId: this.blogPostId,
      parent_id: null,
      user: withData.author,
      // There must be a better way to do this.
      date: new Date().toISOString().slice(0, 10),
      content: withData.comment
    }

    this.commentService.comment(commentData)
      .subscribe({
        next: () => {
          // Comments was submitted successfully.
          // Reload Post Comments. If it was a final product we should use other approaches because we need to
          // keep the comments in real time
          this.cardComments?.reloadComments();

          // Clear the form
          this.commentForm?.resetForm();
          // We should show an error message to be defined. Maybe the HTTP Code + an Error code,
          // and we could show the proper message based on an enum or other (in case we have i18n in place)
        },
        error: (err) => {
          console.error('Unable to comment, we should create a component');
          window.alert(`Unable to comment: ${JSON.stringify(err)}`)
        }
      });
  }
}
