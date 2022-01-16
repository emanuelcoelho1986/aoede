import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiEndpoints} from "../../enum/Api.endpoints.enum";
import {map, Observable} from "rxjs";
import {Post} from "../../model/post";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}${ApiEndpoints.POSTS}`);
  }

  get(id: Number): Observable<Post> {
    return this.http.get<Post>(`${environment.apiUrl}${ApiEndpoints.POSTS}/${id}`);
  }
}
