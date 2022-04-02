import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiEndpoints} from "../../enum/Api.endpoints.enum";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {Comment} from "../../model/comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {}

  getCommentsFromPost(withId: Number): Observable<Comment[]> {
    const endpoint = `${environment.apiUrl}${ApiEndpoints.COMMENTS.replace('POST_ID', withId.toString(10))}`;
    return this.http.get<Comment[]>(endpoint);
  }

  /**
   * Comment on a post
   * Setting `withValue` as Partial because we might be creating a Post and therefore
   * We might not have an ID
   * @param withValue
   */
  comment(withValue: Partial<Comment>): Observable<Comment> {
    if (withValue.id) {
      return this.updateCommentOnPost(withValue as Comment);
    }

    return this.createCommentOnPost(withValue as Comment);
  }

  private createCommentOnPost(withValue: Comment) {
    const endpoint = `${environment.apiUrl}${ApiEndpoints.COMMENTS.replace('POST_ID', withValue.postId.toString())}`
    return this.http.post<Comment>(endpoint, withValue);
  }

  private updateCommentOnPost(withValue: Comment) {
    const endpoint = `${environment.apiUrl}${ApiEndpoints.UPDATE_COMMENT}/${withValue.id}`
    return this.http.put<Comment>(endpoint, withValue);
  }
}
