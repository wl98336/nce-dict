import {
  Component,
  computed,
  effect,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Sentence } from './sentence/sentence-typing';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../service/book.service';
import { AudioPlayer } from '../audio-player/audio-player';

@Component({
  selector: 'lesson-typing',
  imports: [Sentence, FormsModule, AudioPlayer],
  templateUrl: './lesson-typing.html',
  styleUrl: './lesson-typing.scss',
})
export class LessonTyping implements OnInit, OnDestroy {
  bookId = computed(() => this.bookService.bookId());
  lessonId = computed(() => this.bookService.lessonId());
  lessonContent = computed(() => this.bookService.lessonContent());

  audioUrl = signal('');
  constructor(private bookService: BookService) {
    effect(() => {
      const audioNames = this.bookService.audioFileNames();
      const url = `assets/book-${this.bookId()}/audio/${audioNames.get(
        this.lessonId().toString()
      )}`;
      this.audioUrl.set(url);
    });
  }

  ngOnDestroy(): void {}
  ngOnInit(): void {}

  focusNextSentence(event: any): void {
    console.log('focus next sentence: ', event);
  }
  repeatStart: number = 0;
  repeatUntill: number = 0;
}
