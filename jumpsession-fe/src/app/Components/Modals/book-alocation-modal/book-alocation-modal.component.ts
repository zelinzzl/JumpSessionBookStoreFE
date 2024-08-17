import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/Models/book';
import { BooksService } from 'src/app/Services/books.service';
// import { BookService } from 'src/app/Services/book.service';
import { Profile } from 'src/app/Models/profile';

@Component({
  selector: 'app-book-alocation-modal',
  templateUrl: './book-alocation-modal.component.html',
  styleUrls: ['./book-alocation-modal.component.css']
})
export class BookAlocationModalComponent {
  @Input() selectedProfile: Profile | null = null;
  @Output() close = new EventEmitter<void>();

  book: Book = {
    id: 0,
    book_name: '',
    isbn_number: '',
    author: ''
  };

  assignBook(bookId: string) {
    // Implement the logic to assign the book to the user
    console.log(`Assigning book ID: ${bookId} to user: ${this.selectedProfile!.name}`);
    this.close.emit();  // Close the modal after assignment (optional)
  }

  constructor(private bookService: BooksService) { }

  saveBook() {
    this.bookService.createBook(this.book).subscribe({
      next: (createdBook: Book) => {
        console.log('Book created successfully:', createdBook);
        this.closeModal();
      },
      error: (err: any) => {
        console.log('Error creating book:', err);
      }
    });
    // this.bookService.createBook(this.book).subscribe(
    //   (createdBook: Book) => {
    //     console.log('Book created successfully:', createdBook);
    //     this.closeModal();
    //   },
    //   error => {
    //     console.error('Error creating book:', error);
    //   }
    // );
  }

  closeModal() {
    this.close.emit();
  }
}
