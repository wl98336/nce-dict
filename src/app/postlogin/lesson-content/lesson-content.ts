import { Component, computed, effect, OnDestroy, signal } from '@angular/core';
import { BookService } from '../../service/book.service';
import { NgClass } from '@angular/common';
import { AudioPlayer } from '../audio-player/audio-player';

@Component({
  selector: 'lesson-content',
  imports: [NgClass, AudioPlayer],
  templateUrl: './lesson-content.html',
  styleUrl: './lesson-content.scss',
})
export class LessonContent implements OnDestroy {
  bookId = computed(() => this.bookService.bookId());
  lessonId = computed(() => this.bookService.lessonId());
  audioFileNames = computed(() => this.bookService.audioFileNames());

  audioAction = signal('');
  audioUrl = signal('');
  lessonContent = computed(() => this.bookService.lessonContent());
  hideEN = signal(false);
  hideZH = signal(false);

  private audioNames: any;
  constructor(private bookService: BookService) {
    effect(() => {
      const audioNames = this.bookService.audioFileNames();
      const url =
        'assets/audio/nce' + this.bookId() + '/' + audioNames.get(this.lessonId().toString());
      this.audioUrl.set(url);
    });
  }

  toggleEN() {
    this.hideEN.update((value) => !value);
  }
  toggleZH() {
    this.hideZH.update((value) => !value);
  }
  ngOnDestroy(): void {
    console.log('LessonContent ngOnDestroy');
    this.audioAction.set('stop');
  }
}
