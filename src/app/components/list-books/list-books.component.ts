import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit{

  books: Book[] = [];

  keyword: string = "";
  
  ngOnInit(): void {
    this.getAllActiveBooks();
  }

  constructor(private bookService: BookService) {
  }

  /*
  FALTA:
    - Agregar bien las busquedas
    - Agregar las validaciones con los checkbox
    - Hacer busquedas sin ngModel, usar onSubmit
  */
  
  getAllActiveBooks(): void{
    this.bookService.getAllActiveBooks().subscribe(
      data => {
        this.books = data.content
        console.log(data.content);
      },
      err => console.log(err)
    )
  }
  
  getBooksByKeyword(): void{
    this.bookService.getBooksByKeyword(this.keyword).subscribe(
      data => {
        this.books = data.content
        console.log(data.content);
        this.keyword = "";
      },
      err => console.log(err)
    )
  }

}
