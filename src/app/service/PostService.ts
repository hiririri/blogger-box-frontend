import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Post, POSTS} from "../data/post";

@Injectable()
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return of(POSTS);
  }
}
