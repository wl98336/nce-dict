import { Component, computed, effect, signal } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'app-lesson-guide',
  imports: [NgxExtendedPdfViewerModule],
  templateUrl: './lesson-guide.html',
  styleUrl: './lesson-guide.scss',
})
export class LessonGuide {
  bookId = computed(() => this.bookService.bookId());
  lessonId = computed(() => this.bookService.lessonId());
  studyGuideUrl = signal('');
  constructor(private bookService: BookService) {
    effect(() => {
      const url = 'assets/guide/nce' + this.bookId() + '/' + this.lessonId() + '.pdf';
      console.log('colin 1111111111111111111', url);
      this.studyGuideUrl.set(url);
    });
  }
}
