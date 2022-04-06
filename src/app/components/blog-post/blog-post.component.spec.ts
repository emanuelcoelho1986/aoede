import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BlogPostComponent} from './blog-post.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {SafePipe} from "../../pipes/safe.pipe";
import {CardCommentsComponent} from "../card-comments/card-comments.component";
import {of} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {BlogPostsMock} from "../../../../mocks/test/blog-posts.mock";
import {CommentFormComponent} from "../comment-form/comment-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Meta} from "@angular/platform-browser";
import {BrowserTestingModule} from "@angular/platform-browser/testing";

describe('BlogPostComponent', () => {
  const blogPostMock = BlogPostsMock[0];

  const stubRoute = class {
    data = of({ blogPost: blogPostMock })
  };

  let component: BlogPostComponent;
  let fixture: ComponentFixture<BlogPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserTestingModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        SafePipe,
        BlogPostComponent,
        CardCommentsComponent,
        CommentFormComponent
      ],
      providers: [
        { provide: ActivatedRoute, useClass: stubRoute },
        Meta
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostComponent);
    component = fixture.componentInstance;
    component.blogPost$.next(blogPostMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title "${blogPostMock.title}"`, () => {
    const componentElement: HTMLElement = fixture.nativeElement;
    const titleElementList = componentElement.querySelectorAll('h1');

    expect(titleElementList.length).toEqual(1);

    const titleElement = titleElementList.item(0);

    expect(componentElement).toBeDefined();
    expect(titleElement).toBeDefined();
    expect(titleElement?.textContent).toBe(blogPostMock.title.toString());
  });

});
