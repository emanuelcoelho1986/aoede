import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardCommentComponent} from './card-comment.component';
import {SafePipe} from "../../pipes/safe.pipe";
import {CardCommentActionsComponent} from "../card-comment-actions/card-comment-actions.component";
import {BlogPostCommentsMock} from "../../../../mocks/test/blog-post-comments.mock";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CommentService} from "../../modules/blog/services/comment/comment.service";

describe('CardCommentComponent', () => {
  let component: CardCommentComponent;
  let fixture: ComponentFixture<CardCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        SafePipe,
        CardCommentComponent,
        CardCommentActionsComponent
      ],
      providers: [
        CommentService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCommentComponent);
    component = fixture.componentInstance;

    component.comment = BlogPostCommentsMock[1];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a comment from "${BlogPostCommentsMock[1].user}"`, () => {
    const commentElement:HTMLElement = fixture.nativeElement;
    expect(commentElement).toBeDefined();

    const userElementNodeList = commentElement.querySelectorAll('strong');
    expect(userElementNodeList.length).toBe(1);

    const userElement = userElementNodeList.item(0);
    expect(userElement.textContent).toContain(BlogPostCommentsMock[1].user);
  })
});
