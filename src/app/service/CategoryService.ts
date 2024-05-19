import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Category } from '../data/category';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private categoriesUrl: string = `${environment.apiUrl}v1/categories/`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.categoriesUrl)
      .pipe(catchError(this.handleError<Category[]>('getAll', [])));
  }

  getById(id: string): Observable<Category> {
    return this.http
      .get<Category>(`${this.categoriesUrl}/${id}`)
      .pipe(catchError(this.handleError<Category>('getById', undefined)));
  }

  create(category: Category): Observable<Category> {
    return this.http
      .post<Category>(this.categoriesUrl, category)
      .pipe(catchError(this.handleError<Category>('create', category)));
  }

  update(category: Category): Observable<Category> {
    return this.http
      .put<Category>(this.categoriesUrl, category)
      .pipe(catchError(this.handleError<Category>('update', category)));
  }

  delete(category: Category): Observable<boolean> {
    return this.http
      .delete<boolean>(`${this.categoriesUrl}/${category.id}`)
      .pipe(catchError(this.handleError<boolean>('delete', false)));
  }

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`, error); // log to console
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
