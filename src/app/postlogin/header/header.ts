import { NgClass } from '@angular/common';
import { Component, computed, effect, signal, WritableSignal } from '@angular/core';
import { BookService } from '../../service/book.service';
import { ModalService } from '../../service/modal.service';
import { Book } from '../../model/model';
import { LessonSelector } from '../lesson-selector/lesson-selector';

@Component({
  selector: 'nce-header',
  imports: [NgClass],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  selectedBook: WritableSignal<Book> = signal({ id: 0 , zh: '点击选择', en: 'Click to Select'});
  bookList = computed(() => this.bookService.bookListSg());
  bookId = computed(() => this.bookService.bookId());
  lessonId = computed(() => this.bookService.lessonId());
  showDropdown: WritableSignal<boolean> = signal(false);

  constructor(private bookService: BookService, private modalService: ModalService) {
    effect(() => {
      const book = this.bookList().find((book) => book.id == this.bookId());
      if (book) {
        this.selectedBook.set(book);
      }
    });
  }
  openDropdown(): void {
    this.showDropdown.set(!this.showDropdown());
  }
  selectBook(book: Book): void {
    this.bookService.chooseBook(book.id);
    this.showDropdown.set(false);
  }
  selectingLesson = signal(false);

  openLessonList(): void {
    this.modalService.modal.set({ show: true, type: LessonSelector });
  }
  selectLesson(id: number): void {
    console.log('selected Lesson', id);
    this.bookService.chooseLesson(id);
  }
}
