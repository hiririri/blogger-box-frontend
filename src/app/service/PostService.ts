import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, of, retry} from "rxjs";
import {Post, PostCreateInput} from "../data/post";
import {environment} from "../environments/environment";

@Injectable()
export class PostService {
  private postsUrl: string = `${environment.apiUrl}v1/posts/`

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl)
      .pipe(
        catchError(this.handleError<Post[]>('getPosts', []))
      );
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.postsUrl}/post/${id}`)
      .pipe(
        catchError(this.handleError<Post>('getPostById', undefined))
      );
  }

  getPostsByCategoryId(categoryId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postsUrl}/category/${categoryId}`)
      .pipe(
        catchError(this.handleError<Post[]>('getPostsByCategoryId', []))
      );
  }

  createPost(post: PostCreateInput): Observable<Post | PostCreateInput> {
    return this.http.post<Post>(this.postsUrl, post)
      .pipe(
        catchError(this.handleError<PostCreateInput>('createPost', post))
      );
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(this.postsUrl, post)
      .pipe(
        catchError(this.handleError<Post>('updatePost', post))
      );
  }

  deletePost(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.postsUrl}/post/${id}`)
      .pipe(
        catchError(this.handleError<boolean>('deletePost', false))
      );
  }

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`, error); // log to console
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
