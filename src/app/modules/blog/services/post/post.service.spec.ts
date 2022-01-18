import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { POSTS } from "../../tests/Posts.mocks";
import { environment } from "../../../../../environments/environment";
import { ApiEndpoints } from "../../enum/Api.endpoints.enum";
import {Post} from "../../model/post";

describe('PostService', () => {
  let httpTestingController: HttpTestingController;
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PostService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('calling getAll should return all posts', (done) => {

    service.getAllPosts().subscribe(
      {
        next: (posts) => {
          expect(posts.length).toEqual(POSTS.length);
          expect(JSON.stringify(posts)).toEqual(JSON.stringify(POSTS));
          done();
        },
        error: () => {
          done.fail('Should not land here');
        }
      });

    const req = httpTestingController
      .expectOne(`${environment.apiUrl}${ApiEndpoints.POSTS}`);

    req.flush(POSTS);
  });

  it(`calling get with ID 1 should return only one post`, (done) => {
    const postId = 1;
    // we know the first post has ID 0
    const postWithIdOne = POSTS[0];

    service.getPost(postId).subscribe({
      next: (post) => {
        expect(post).toBeDefined();
        expect(post.id).toEqual(postId);
        done();
      },
      error: () => {
        done.fail('Should not land here');
      }
    });

    const req = httpTestingController
      .expectOne(`${environment.apiUrl}${ApiEndpoints.POSTS}/${postId}`);

    req.flush(postWithIdOne);
  })
});
