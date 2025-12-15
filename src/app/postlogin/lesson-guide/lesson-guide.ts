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
      const guideNames = this.bookService.guideFileNames();
      const idStr = this.lessonId().toString();
      const fileName = guideNames.has(idStr) ? guideNames.get(idStr) : idStr + '.pdf';
      const url = `assets/book-${this.bookId()}/guide/${fileName}`;
      this.studyGuideUrl.set(url);
    });
  }
}
