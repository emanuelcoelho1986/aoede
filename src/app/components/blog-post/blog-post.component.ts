import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../modules/blog/model/post";
import {BehaviorSubject, mergeMap, Observable, Subject, takeUntil} from "rxjs";
import {IFormComment} from "../../models/IFormComment";
import {Comment} from "../../modules/blog/model/comment";
import {CommentFormComponent} from "../comment-form/comment-form.component";
import {BlogPostService} from "../../services/blog-post.service";
import {Meta, Title} from "@angular/platform-browser";
import {LocationStrategy} from "@angular/common";

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit, OnDestroy {

  private metaTags: HTMLMetaElement[] = [];

  @ViewChild(CommentFormComponent)
  commentForm: CommentFormComponent | undefined;

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  blogPost$: BehaviorSubject<Post | undefined> = new BehaviorSubject<Post | undefined>(undefined);

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route: ActivatedRoute,
              private blogPostService: BlogPostService,
              private titleService: Title,
              private metaTagService: Meta,
              private locationStrategy: LocationStrategy) {}

  ngOnInit(): void {
    // Lets use a forkJoin to handle 2 requests
    (this.route.data as Observable<{ blogPost: Post }>)
      .pipe(
        takeUntil(this.destroy$),
        mergeMap(({blogPost}) => {
          this.blogPost$.next(blogPost);
          this.updateMetaTags(blogPost);
          this.titleService.setTitle(`Aeode - Post - ${blogPost.title}`)
          return this.blogPostService.loadComments(blogPost.id)
        }),
      )
      .subscribe({
        // In case we want to use a loading value to show a loading spinner or something
        next: (blogPostComments) => this.loading$.next(false)
      });
  }

  ngOnDestroy(): void {
    this.removeMetaTags();
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
    };

    this.blogPostService.addCommentTo(this.blogPostId, commentData)
      .pipe(
        mergeMap(comment => this.blogPostService.loadComments(this.blogPostId))
      )
      .subscribe({
        next: () => {
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

  private updateMetaTags(withData: Post): void {
    this.metaTags = this.metaTagService.addTags([
      { name: 'author', content: withData.author.toString() },
      { name: 'date', content: withData.publish_date.toString(), scheme: 'YYYY-MM-DD' },
      { name: 'content', content: withData.content.toString() },
      // OG Social
      { name: 'og:title', content: withData.title.toString() },
      { name: 'og:author', content: withData.author.toString() },
      { name: 'og:date', content: withData.publish_date.toString() },
      // p/:slug/:id
      { name: 'og:url', content: `${location.origin}${this.locationStrategy.path()}`},
      { name: 'og:site_name', content: 'Aoede' },
      { name: 'og:type', content: 'text/html' },
    ]);
  }

  private removeMetaTags() {
    this.metaTags.forEach(tag => this.metaTagService.removeTagElement(tag));
    this.metaTags = [];
  }
}
