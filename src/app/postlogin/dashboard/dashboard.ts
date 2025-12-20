import { Component, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { LeftMenu } from '../left-menu/left-menu';
import { BookService } from '../../service/book.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  imports: [Header, LeftMenu, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  constructor(private bookService: BookService) {
    effect(() => {
      const bookId = this.bookService.bookId();
      if (!bookId) return;
      this.bookService.loadBookUnits(bookId).subscribe({
        next: (bookUnits) => {
          console.log('bookUnits', bookUnits);
          this.bookService.bookUnits.set(bookUnits);
        },
        error: (HttpErrorResponse) => {
          console.log(HttpErrorResponse.message); // show error message, if any.
        },
      });
      this.bookService.loadBookAudioInfo(bookId).subscribe((data) => {

        this.bookService.audioFileNames.set(data);
      });
      this.bookService.loadBookGuideInfo(bookId).subscribe((data) => {

        this.bookService.guideFileNames.set(data);
      });
      this.bookService.loadBookNewWords(bookId).subscribe((data) => {

        this.bookService.bookNewWords.set(data);
      });
      this.bookService.loadBookNotes(bookId).subscribe((lessonNotes) => {
        this.bookService.lessonNotesSg.set(lessonNotes);
      });
    });
    effect(() => {
      const bookId = this.bookService.bookId();
      const lessonId = this.bookService.lessonId();
      if (!bookId || !lessonId) return;
      this.bookService
        .loadLessonContent(bookId, lessonId)
        .pipe(
          catchError((error) => {
            return this.bookService.loadLessonContentFromDict(bookId, lessonId);
          })
        )
        .subscribe((lessonContent) => {
          this.bookService.lessonContent.set(lessonContent);
        });
    });
  }
}
