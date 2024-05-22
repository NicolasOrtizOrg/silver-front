import { Component } from '@angular/core';
import { CreateBook } from 'src/app/models/CreateBook';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent {

  book: CreateBook = new CreateBook();

  constructor(private bookService: BookService){}

  createBook(){
    this.bookService.createBook(this.book).subscribe(
      data => {
        alert("Creado correctamente");
        this.book = new CreateBook();
      },
      err => alert("Error al crear")
    )
  }

}
