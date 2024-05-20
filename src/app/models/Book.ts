import { Author } from "./Author";

export class Book {
    id: number;
    title: string;
    description: string;
    image: string;
    isbn: string;
    publishedDate: Date;
    author: Author;
}