import { Component, computed, effect, signal, WritableSignal } from '@angular/core';
import { BookService } from '../../service/book.service';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-lesson-note',
  imports: [],
  templateUrl: './lesson-note.html',
  styleUrl: './lesson-note.scss',
})
export class LessonNote {
  bookId = computed(() => this.bookService.bookId());
  lessonId = computed(() => this.bookService.lessonId());
  title = computed(() => this.bookService.lessonContent().title);
  safeHtmlSg: WritableSignal<SafeHtml> = signal('');
  constructor(private bookService: BookService, private sanitizer: DomSanitizer) {
    effect(() => {
      const lessonId = this.lessonId();
      const lessonNotes = this.bookService.lessonNotesSg();
      if (lessonId && lessonNotes.get(lessonId)) {
        const html = marked.parse(lessonNotes.get(lessonId)!, { async: false });
        const safeHtml = this.sanitizer.bypassSecurityTrustHtml(html);
        this.safeHtmlSg.set(safeHtml);
      } else {
        this.safeHtmlSg.set('');
      }
    });
  }
}
