import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiEndpoints} from "../../enum/Api.endpoints.enum";
import {Observable} from "rxjs";
import {Post as BlogPost} from "../../model/post";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  getAllPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${environment.apiUrl}${ApiEndpoints.POSTS}`);
  }

  getPost(id: Number) {
    return this.http.get<BlogPost>(`${environment.apiUrl}${ApiEndpoints.POSTS}/${id}`);
  }
}
