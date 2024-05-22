import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environments } from '../environment';
import { Book } from '../models/Book';
import { Observable } from 'rxjs';
import { CreateBook } from '../models/CreateBook';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  private URL: string = Environments.URL_BASE + "/books";


  getAllActiveBooks(page: number = 0): Observable<any> {
    return this.http.get<Book[]>(this.URL, { params: { page } });
  }

  getBooksByKeyword(keyword: string, page: number = 0): Observable<any> {
    return this.http.get<Book[]>(`${this.URL}/filter`, { params: { keyword, page } });
  }

  getBooksByAuthor(authorName: string, page: number = 0): Observable<any> {
    return this.http.get<Book[]>(`${this.URL}/filter/author`, { params: { authorName, page } });
  }
  
  createBook(newBook: CreateBook): Observable<any> {
    return this.http.post<Book>(this.URL, newBook);
  }


}
