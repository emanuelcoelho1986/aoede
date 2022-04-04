import { TestBed } from '@angular/core/testing';

import { BlogPostService } from './blog-post.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CommentService} from "../modules/blog/services/comment/comment.service";

describe('BlogPostService', () => {
  let service: BlogPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentService]
    });
    service = TestBed.inject(BlogPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
