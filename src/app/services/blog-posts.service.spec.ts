import { TestBed } from '@angular/core/testing';

import { BlogPostsService } from './blog-posts.service';
import {BlogModule} from "../modules/blog/blog.module";

describe('BlogPostsService', () => {
  let service: BlogPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BlogModule
      ]
    });
    service = TestBed.inject(BlogPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
