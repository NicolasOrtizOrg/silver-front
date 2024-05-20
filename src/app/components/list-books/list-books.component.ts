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
  
  ngOnInit(): void {
    this.getBooks();
  }

  constructor(private bookService: BookService) {
  }

  
  private getBooks(): void{
    this.bookService.getAllActiveBooks().subscribe(
      data => {
        this.books = data.content
        console.log(data.content);
      },
      err => console.log(err)
    )
  }

}
