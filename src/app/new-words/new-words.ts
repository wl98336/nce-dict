import { Component, computed, effect, OnDestroy, signal, Signal } from '@angular/core';
import { BookService } from '../service/book.service';
import { WordCard } from './word/word';

@Component({
  selector: 'app-new-words',
  imports: [WordCard],
  templateUrl: './new-words.html',
  styleUrl: './new-words.scss',
})
export class NewWords {
  bookId = computed(() => this.bookService.bookId());
  lessonId = computed(() => this.bookService.lessonId());
  lessonContent = computed(() => this.bookService.lessonContent());
  constructor(private bookService: BookService) {
    effect(() => {
      const lessonId = this.lessonId();
      if (!lessonId) return;
      const bookNewWords = this.bookService.bookNewWords();
      this.updateNewWords(lessonId, bookNewWords);
    });
  }

  newwords = signal<any[]>([]);
  updateNewWords(lessonId: number, bookNewWords: any[]): void {
    if (!lessonId || !bookNewWords.length) return;
    const newwords = bookNewWords.find((lesson) => lesson.lesson == lessonId)?.words;
    this.newwords.set(newwords);
  }
  hideEN = signal(false);
  hideZH = signal(false);
  toggleEN() {
    this.hideEN.update((value) => !value);
  }
  toggleZH() {
    this.hideZH.update((value) => !value);
  }
}
