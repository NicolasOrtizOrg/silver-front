import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { CreateBook } from 'src/app/models/CreateBook';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent implements OnInit {

  // DTOS
  book: CreateBook = new CreateBook();
  books: Book[] = [];

  // Estados actuales
  isUpdating: boolean = false; // Estamos en modo edición?
  currentBookId: number; // El ID del libro a actualizar
  
  // Paginación
  currentPage: number = 0;
  totalPages: Array<number>;
  totalPagesLength: number;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getAllBooks(this.currentPage);
  }

  getAllBooks(page: number) {
    this.bookService.getAllActiveBooks(page).subscribe(
      data => {
        this.books = data.content;
        this.setPagination(data);
      },
      err => console.log(err)
    )
  }

  createOrUpdateBook() {
    if (this.isUpdating && this.currentBookId != -1) {
      this.updateBook();
    }
    else{
      this.createBook();
    }
  }

  createBook() {
    this.bookService.createBook(this.book).subscribe(
      data => {
        alert("Creado correctamente");
        this.cleanStates()
      },
      err => alert("Error al crear")
    )
  }

  updateBook() {
    this.bookService.updateBook(this.currentBookId, this.book).subscribe(
      data => {
        alert("Actualizado correctamente");
        this.cleanStates()
      },
      err => alert("Error al actualizar")
    )
  }

  //----------------------------

  setEditable(book: Book) {
    this.isUpdating = true;
    this.currentBookId = book.id;
    this.book = this.mapToCreateDto(book);
    this.scrollToForm();
  }

  cleanStates() {
    this.isUpdating = false;
    this.currentBookId = -1;
    this.book = new CreateBook();
  }

  //----------------------------
  
  changePage(i: number) {
    this.currentPage = i;
    this.getAllBooks(i);
  }

  setPagination(data: any){
    this.totalPages = new Array(data.totalPages);
    this.totalPagesLength = this.totalPages.length;
  }

  scrollToForm(): void {
    const element = document.getElementById('book-form');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  mapToCreateDto(book: Book): CreateBook {
    const newBook = new CreateBook();
    newBook.title = book.title;
    newBook.description = book.description;
    newBook.image = book.image;
    newBook.isbn = book.isbn;
    newBook.publishedDate = book.publishedDate;
    newBook.authorName = book.author.name;
    return newBook;
  }

}
