import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostsComponent } from './blog-posts.component';
import {BlogModule} from "../../modules/blog/blog.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {PostService} from "../../modules/blog/services/post/post.service";

describe('BlogPostsComponent', () => {
  let component: BlogPostsComponent;
  let fixture: ComponentFixture<BlogPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BlogModule,

        HttpClientTestingModule
      ],
      declarations: [ BlogPostsComponent ],
      providers: [ PostService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
