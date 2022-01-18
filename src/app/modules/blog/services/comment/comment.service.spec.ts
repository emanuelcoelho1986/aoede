import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import {CommentService} from "./comment.service";
import {environment} from "../../../../../environments/environment";
import {ApiEndpoints} from "../../enum/Api.endpoints.enum";
import {COMMENTS} from "../../tests/Comments.mock";
import {Comment} from "../../model/comment";

describe('CommentService', () => {
  let httpTestingController: HttpTestingController;
  let service: CommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CommentService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the comments from a post', (done) => {
    const postId = 1;
    const expectedEndpoint = `${environment.apiUrl}${ApiEndpoints.COMMENTS.replace('POST_ID', postId.toString(10))}`

    service.getCommentsFromPost(1)
      .subscribe({
        next: (comments) => {
          expect(comments.length).toEqual(COMMENTS.length);
          done();
        },
        error: () => done.fail('We should not be here')
      });

    const req = httpTestingController
      .expectOne(expectedEndpoint);

    // I know I'm passing all comments. To make sure we are getting the real thing we should do a
    // find, filter by post_id or any other creative method you want to make ourselves
    req.flush(COMMENTS);
  });

  it('should create a comment', (done) => {
    const mockComment = COMMENTS[0];
    // Making sure we will create the real function and call the desired endpoint
    delete mockComment.id;

    const expectedEndpoint = `${environment.apiUrl}${ApiEndpoints.COMMENTS.replace('POST_ID', (mockComment as Comment).post_id.toString())}`;

    service.comment(mockComment)
      .subscribe({
        next: (response) => {
          expect(response).toEqual(mockComment);
          done();
        },
        error: () => done.fail('We should not be here')
      })

    const req = httpTestingController
      .expectOne({
        url: expectedEndpoint,
        method: 'POST'
      });

    req.flush(mockComment);
  });

  it('should update a comment', (done) => {
    const mockComment = COMMENTS[1];
    // Making sure we will create the real function and call the desired endpoint

    const expectedEndpoint = `${environment.apiUrl}${ApiEndpoints.UPDATE_COMMENT}/${mockComment.id}`;

    service.comment(mockComment)
      .subscribe({
        next: (response) => {
          expect(response).toEqual(mockComment);
          done();
        },
        error: () => done.fail('We should not be here')
      })

    const req = httpTestingController
      .expectOne({
        url: expectedEndpoint,
        method: 'PUT'
      });

    req.flush(mockComment);
  })

});
