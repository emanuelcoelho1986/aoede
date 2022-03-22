import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BlogPostComponent} from './blog-post.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {SafePipe} from "../../pipes/safe.pipe";
import {CardCommentsComponent} from "../card-comments/card-comments.component";

describe('BlogPostComponent', () => {
  let component: BlogPostComponent;
  let fixture: ComponentFixture<BlogPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [
        SafePipe,
        BlogPostComponent,
        CardCommentsComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
