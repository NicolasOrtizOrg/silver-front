import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { CreateBook } from 'src/app/models/CreateBook';
import { Playlist } from 'src/app/models/Playlist';
import { BookService } from 'src/app/services/book.service';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-card-book',
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.css']
})
export class CardBookComponent implements OnInit {

  @Input() book: Book = new Book();

  playlists: Playlist[] = [];

  constructor(private playlistService: PlaylistService, private bookService: BookService) {
  }
  ngOnInit(): void {
    this.getPlaylists();
  }

  // Cambiar método cuando cree el formulario de CREAR LIBROS
  // Hacer: Cambiar esto para LLAMAR AL METODO PARA CREAR LIBROS.
  // No hacerlo desde acá. Solución temporal
  addOrCreateBook(book: Book, playlistId: number) {
    let newBook = this.mapToCreateDto(book);

    if (book.id == -1) {
      this.bookService.createBook(newBook).subscribe(
        data => {
          this.addBook(data.id, playlistId)
          newBook = new CreateBook();
        },
        err => console.log(err)
      )
    }
  }

  getPlaylists() {
    this.playlistService.getAllPlaylists().subscribe(
      data => this.playlists = data,
      err => console.log(err)
    )
  }

  addBook(bookId: number, playlistId: number) {
    this.playlistService.addBook(bookId, playlistId).subscribe(
      data => {
        alert("Agregado correctamente");
        this.playlistService.nofityPlaylistUpdated();
      },
      err => alert("No se pudo agregar")
    )
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

  noImage: string = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";

}
