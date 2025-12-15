import { ChangeDetectorRef, Component, signal, WritableSignal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DictService } from '../service/dict.service';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-refer',
  imports: [FormsModule, NgClass],
  templateUrl: './refer.html',
  styleUrl: './refer.scss',
})
export class Refer {
  withResult = signal(false);
  isLesson = signal(false);
  description = signal('');
  referList: WritableSignal<any[]> = signal([]);
  value: string = '';
  safeHtmlContent: SafeHtml = '';
  private descriptions = ['输入中文英文皆可', '没有记录'];
  constructor(
    private dictService: DictService,
    private sanitizer: DomSanitizer,
    private auth: AuthService,
    private router: Router,
    private bookService: BookService
  ) {
    console.log('Refer constructor');
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.lookup(event);
    }
  }
  lookup(event: any): void {
    if (!this.value) {
      this.withResult.set(false);
      this.description.set(this.descriptions[0]);
      this.isLesson.set(false);
      this.referList.set([]);
    }
    this.dictService.lookupNCE(this.value).subscribe({
      next: (data) => {
        this.withResult.set(true);
        const { keyText, definition } = data as any;
        if (!definition) {
          this.isLesson.set(false);
          this.referList.set([]);
          this.description.set(this.descriptions[1]);
          return;
        }
        const lessonEntryPatt = /^C[1-4]\d{3}$/;
        const lesson = lessonEntryPatt.test(keyText);
        this.isLesson.set(lesson);
        this.safeHtmlContent = this.sanitizer.bypassSecurityTrustHtml(definition);
        const domParser = new DOMParser();
        const dict = domParser.parseFromString((definition as string).trim(), 'text/html');
        //console.log('refer', (definition as string).trim(), dict.body.childNodes);
        const childNodes = dict.body.childNodes;
        const referList = Array.from(childNodes).reduce((referList, node, index, nodeArray) => {
          if (node.nodeName.toUpperCase() == 'A') {
            const entry = (node as Element).innerHTML;
            const bookId = Number(entry.substring(1, 2));
            const lessonId = Number(entry.substring(2));
            let refer = referList.at(-1);
            if (!refer || refer.bookId !== bookId) {
              refer = {
                bookId,
                lessons: [],
              };
              referList.push(refer);
            }
            let lesson = refer.lessons.at(-1);
            if (!lesson || lesson.lessonId !== lessonId) {
              lesson = { id: entry, lessonId, sentences: [{ en: '', zh: '' }] };
              refer.lessons.push(lesson);
            }
            let nextIndex = index + 1;
            while (nodeArray[nextIndex] && nodeArray[nextIndex].nodeName.toUpperCase() !== 'A') {
              let sentence = lesson.sentences.at(-1);
              if (nodeArray[nextIndex].nodeName.toUpperCase() == 'DIV') {
                //zh content
                sentence.zh = (nodeArray[nextIndex] as Element).innerHTML;
                if (nodeArray[nextIndex + 1].nodeName.toUpperCase() !== 'A') {
                  lesson.sentences.push({ en: '', zh: '' });
                }
              } else if ((nodeArray[nextIndex] as Element).innerHTML !== '\n') {
                const html =
                  nodeArray[nextIndex].nodeType == 3
                    ? nodeArray[nextIndex].nodeValue
                    : (nodeArray[nextIndex] as Element).outerHTML;
                sentence.en = sentence.en.concat(html!);
              }
              nextIndex++;
            }
          }
          return referList;
        }, [] as Array<any>);
        this.referList.set(referList);
      },
      error: (HttpErrorResponse) => {
        console.log(HttpErrorResponse.message); // show error message, if any.
      },
    });
  }

  lessonClicked(bookId: number, lessonId: number, event: Event) {
    this.bookService.chooseBook(bookId);
    this.bookService.chooseLesson(lessonId);
    if (this.auth.isCustomer()) {
      this.router.navigate(['/dashboard/read']);
    } else {
      this.auth.toast.set('need_signon');
    }
    event?.preventDefault();
  }
}
