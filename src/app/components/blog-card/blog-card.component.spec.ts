import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BlogCardComponent} from './blog-card.component';
import {SafePipe} from "../../pipes/safe.pipe";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CardCommentsComponent} from "../card-comments/card-comments.component";
import {NumberOfCommentsComponent} from "../number-of-comments/number-of-comments.component";
import {BlogPostsMock} from "../../../../mocks/test/blog-posts.mock";

describe('BlogCardComponent', () => {
  let component: BlogCardComponent;
  let fixture: ComponentFixture<BlogCardComponent>;

  const blogPostMock = BlogPostsMock[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        BlogCardComponent,
        CardCommentsComponent,
        NumberOfCommentsComponent,
        SafePipe
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCardComponent);
    component = fixture.componentInstance;

    component.blogPost = blogPostMock;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have title "${blogPostMock}"`, () => {
    const blogCardElement: HTMLElement = fixture.nativeElement;
    expect(blogCardElement).toBeDefined();

    const titleElementsList = blogCardElement.querySelectorAll('h1');
    expect(titleElementsList.length).toBe(1);

    const titleElement = titleElementsList.item(0);
    expect(titleElement.textContent).toEqual(blogPostMock.title.toString());
  });
});
