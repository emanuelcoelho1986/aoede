import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BlogCardsComponent} from './blog-cards.component';
import {BlogModule} from "../../modules/blog/blog.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BlogPostsMock} from "../../../../mocks/test/blog-posts.mock";
import {BlogPostsService} from "../../services/blog-posts.service";
import {of} from "rxjs";
import {BlogCardComponent} from "../blog-card/blog-card.component";
import {SafePipe} from "../../pipes/safe.pipe";
import {NumberOfCommentsComponent} from "../number-of-comments/number-of-comments.component";
import {RouterTestingModule} from "@angular/router/testing";

describe('BlogCardsComponent', () => {
  let component: BlogCardsComponent;
  let fixture: ComponentFixture<BlogCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BlogModule,

        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        SafePipe,
        NumberOfCommentsComponent,
        BlogCardComponent,
        BlogCardsComponent
      ],
      providers: [
        {
          provide: BlogPostsService,
          useClass: class  {
            getBlogPosts = () => {
              return of(BlogPostsMock)
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 cards',
    () => {
      const cardsElement: HTMLElement = fixture.nativeElement;
      expect(cardsElement).toBeDefined();

      const cardsElementsList = cardsElement.querySelectorAll('app-blog-card');
      expect(cardsElementsList.length).toEqual(BlogPostsMock.length);

      BlogPostsMock.forEach((blogPostMock, index) => {
        const cardTitleElement = cardsElementsList.item(index);
        expect(cardTitleElement.querySelector('h1')?.textContent).toEqual(blogPostMock.title.toString());
      })
    })
});
