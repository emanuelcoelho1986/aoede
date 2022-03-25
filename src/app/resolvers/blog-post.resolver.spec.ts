import {TestBed} from '@angular/core/testing';

import {BlogPostResolver} from './blog-post-resolver.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('BlogPostResolver', () => {
  let service: BlogPostResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BlogPostResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
