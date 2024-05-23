import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from 'src/app/models/Book';
import { BookParams } from 'src/app/models/BookParams';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css'],
})
export class ListBooksComponent implements OnInit {

  // DTOS
  books: Book[] = [];
  bookParams: BookParams = new BookParams();

  // 
  params: any = {};
  isLoading: boolean = false;

  // Paginación
  currentPage: number = 0;
  totalPages: Array<number>;
  totalPagesLength: number;

  ngOnInit(): void {
    this.getAllActiveBooks(this.currentPage);
  }

  constructor(private bookService: BookService) { }

  /*
  FALTA:
    - Agregar búsquedas dinámicas
  */

  getBooks(form: NgForm) {
    const keyword = form.value.keyword;

    if (form.value.author) {
      const authorName = form.value.keyword;
      console.log(form.value.keyword);

      this.getBooksByAuthor(authorName);
    }
    else this.getBooksByKeyword(keyword);
  }

  getAllActiveBooks(page: number): void {
    this.isLoading = true;
    this.bookService.getAllActiveBooks(page).subscribe(
      data => {
        this.books = data.content;
        this.setPagination(data);
        this.isLoading = false;
      },
      err => console.log(err)
    );
  }

  getBooksByKeyword(keyword: string): void {
    this.isLoading = true;
    this.bookService.getBooksByKeyword(keyword).subscribe(
      data => {
        this.books = data.content;
        this.setPagination(data);
        this.isLoading = false;
      },
      err => console.log(err)
    )
  }

  getBooksByAuthor(authorName: string): void {
    this.bookService.getBooksByAuthor(authorName).subscribe(
      data => {
        this.books = data.content;
        this.setPagination(data);
        this.isLoading = false;
      },
      err => console.log(err)
    )
  }

  // ---------------------------------------
  
  changePage(i: number) {
    this.currentPage = i;
    this.getAllActiveBooks(i);
    this.scrollToTop();
  }

  setPagination(data: any){
    this.totalPages = new Array(data.totalPages);
    this.totalPagesLength = this.totalPages.length;
  }
  
  scrollToTop(): void {
    const element = document.getElementById('search-books');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  validateParams(ngForm: NgForm) {
    const formValue = ngForm.value;
    this.bookParams.title = formValue.title;
    this.bookParams.author = formValue.author;

    for (const key in this.bookParams) {
      const value = this.bookParams[key as keyof BookParams];
      if (value) {
        this.params[key as keyof BookParams] = this.bookParams[key as keyof BookParams];
      }
    }
    this.params = {}
  }

}
