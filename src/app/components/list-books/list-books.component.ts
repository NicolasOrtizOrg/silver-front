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

  books: Book[] = [];
  bookParams: BookParams = new BookParams();

  params: any = {};
  isLoading: boolean = false;

  // keyword: string = "";

  ngOnInit(): void {
    this.getAllActiveBooks();
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

  getAllActiveBooks(): void {
    this.isLoading = true;
    this.bookService.getAllActiveBooks().subscribe(
      data => {
        this.books = data.content;
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
        this.isLoading = false;
      },
      err => console.log(err)
    )
  }

  getBooksByAuthor(authorName: string): void {
    this.bookService.getBooksByAuthor(authorName).subscribe(
      data => {
        console.log(data.content);
        
        this.books = data.content;
        this.isLoading = false;
      },
      err => console.log(err)
    )
  }

  // ---------------------------------------

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
