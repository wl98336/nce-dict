import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { DictService } from './dict.service';
import { Book, BookUnit, Lesson, LessonNewWords, LessonContent } from '../model/model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  bookId = signal(0);
  lessonId = signal(0);

  bookSg: WritableSignal<Book> = signal({ id: 0, title: '' });
  bookUnits: WritableSignal<BookUnit[]> = signal([]);
  lessonSg: WritableSignal<Lesson | undefined> = signal(undefined);
  bookListSg: WritableSignal<Book[]> = signal([]);
  private bookList: Book[] = [];
  bookNewWords: WritableSignal<LessonNewWords[]> = signal([]);
  audioFileNames: WritableSignal<Map<string, string>> = signal(new Map());
  lessonContent: WritableSignal<LessonContent> = signal({
    title: { en: '', zh: '' },
    audio: '',
    sentences: [],
  });
  lessonNotesSg: WritableSignal<Map<number, string>> = signal(new Map());
  lessonNeedFromDict = signal<string | undefined>(undefined);
  constructor(private httpService: HttpClient, private dictService: DictService) {
    const bookId = localStorage.getItem('BOOKID');
    if (Number(bookId)) {
      this.bookId.set(Number(bookId));
    }
    const lessonId = localStorage.getItem('LESSONID');
    if (Number(lessonId)) {
      this.lessonId.set(Number(lessonId));
    }
    this.loadBookList();
  }
  private loadBookList(): void {
    this.httpService.get(environment.booksApi).subscribe({
      next: (data) => {
        this.bookList = data as Book[];
        this.bookListSg.set(this.bookList);
      },
      error: (error) => {
        this.bookListSg.set([{ id: 0, zh: '未正确配置书本列表' }]);
      },
    });
  }

  loadBookUnits(id: number): Observable<BookUnit[]> {
    return this.httpService.get<BookUnit[]>(`./assets/book-${id}/units.json`);
  }

  loadBookAudioInfo(id: number): Observable<Map<string, string>> {
    return this.httpService.get(`./assets/book-${id}/audio.json`).pipe(
      map((data) => {
        const mapData = new Map();
        for (const key in Object.keys(data)) {
          if (!Object.hasOwn(data, key)) continue;
          const value = (data as any)[key];
          mapData.set(key, value);
        }
        return mapData;
      })
    );
  }

  loadBookNewWords(id: number): Observable<LessonNewWords[]> {
    return this.httpService.get<LessonNewWords[]>(`./assets/book-${id}/words.json`);
  }

  loadBookNotes(id: number): Observable<Map<number, string>> {
    return this.httpService.get(`./assets/book-${id}/notes.md`, { responseType: 'text' }).pipe(
      map((data) => {
        const lessons = data.split(new RegExp('# Lesson', 'i'));
        const lessonNotes = lessons.reduce((lessonNotes: Map<number, string>, lesson) => {
          const patternRange = /^ ?\d+-\d+/;
          const matchedRange = lesson.match(patternRange);
          if (matchedRange) {
            const lessonIds = matchedRange[0].split('-');
            for (
              let lessonId = Number(lessonIds[0]);
              lessonId <= Number(lessonIds[1]);
              lessonId++
            ) {
              lessonNotes.set(lessonId, lesson);
            }
            console.log('lesson Id between', lessonIds);
            return lessonNotes;
          }
          const patternBoth = / ?\d+(&\d+)+/;
          const matchedBoth = lesson.match(patternBoth);
          if (matchedBoth) {
            const lessonIds = matchedBoth[0].split('&');
            lessonIds.forEach((lessonId) => {
              lessonNotes.set(Number(lessonId), lesson);
            });
            return lessonNotes;
          }
          const patternSingle = /\d+/;
          const matchedSingle = lesson.match(patternSingle);
          if (matchedSingle) {
            lessonNotes.set(Number(matchedSingle[0]), lesson);
            return lessonNotes;
          }
          return lessonNotes;
        }, new Map<number, string>());
        return lessonNotes;
      })
    );
  }

  loadLessonContent(bookId: number, lessonId: number): Observable<LessonContent> {
    return this.httpService.get<LessonContent>(
      './assets/nce' + bookId + '/lesson-' + lessonId + '.json'
    );
  }

  loadLessonContentFromDict(bookId: number, lessonId: number): Observable<LessonContent> {
    const lessonKey = 'C' + bookId.toString() + lessonId.toString().padStart(3, '0');
    return this.dictService.lookupNCE(lessonKey).pipe(
      map((data) => {
        console.log('loaded LessonContent from dict');
        const parser = new DOMParser();
        const doc = parser.parseFromString((data as any).definition, 'text/html');
        console.log(doc.body.getElementsByTagName('DIV'));
        const lessonContent = Array.from(doc.body.getElementsByTagName('DIV')).reduce(
          (lessonContent, div, index, array) => {
            if (div.className == 'title_en') {
              lessonContent.title = {
                en: div.textContent,
                zh: div.nextSibling?.textContent?.toString(),
              };
            } else if (div.className == 'en') {
              lessonContent.sentences?.push({
                en: div.textContent,
                zh: div.nextSibling?.textContent?.toString(),
              });
            }
            return lessonContent;
          },
          { title: { en: '', zh: '' }, sentences: [] } as LessonContent
        );
        console.log('lessonContent from dict', lessonContent);
        return lessonContent;
      })
    );
  }

  chooseBook(id: number): void {
    this.bookId.set(id);
    localStorage.setItem('BOOKID', id.toString());
  }
  chooseLesson(id: number): void {
    this.lessonId.set(id);
    localStorage.setItem('LESSONID', id.toString());
  }
}
