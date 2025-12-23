import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DictService } from '../../service/dict.service';
@Component({
  selector: 'app-dictionary',
  imports: [FormsModule],
  templateUrl: './dictionary.html',
  styleUrl: './dictionary.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Dictionary {
  value: string = '';
  safeHtmlContent: SafeHtml = '';
  constructor(
    private dictService: DictService,
    private sanitizer: DomSanitizer,
    private ref: ChangeDetectorRef,
    private el: ElementRef<HTMLElement>
  ) {
    console.log('Dictionary constructor');
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.lookup(event);
    }
  }
  lookup(event: any): void {
    this.dictService.lookupDict(this.value).subscribe({
      next: (data) => {
        this.safeHtmlContent = this.sanitizer.bypassSecurityTrustHtml(
          (data as any).definition.replace(/<head>.*<\/head>/g, '').replace(/<img src="([a-zA-Z0-9_]+.jpg)">/g, "<img src=\"mdd/$1\">")
        );
        this.ref.detectChanges();
        //set Time out because ngAfterViewChecked run too many times.
        setTimeout(() => {
          this.el.nativeElement.querySelectorAll<HTMLDivElement>('.pic_thumb').forEach((ele) => {
            ele.onclick = null;
            ele.addEventListener('click', this.expand_big.bind(this));
          });
          this.el.nativeElement.querySelectorAll<HTMLDivElement>('.big_pic').forEach((ele) => {
            ele.onclick = null;
            ele.addEventListener('click', this.expand_thumb.bind(this));
          });
          this.el.nativeElement
            .querySelectorAll<HTMLAnchorElement>('a[href^=entry]')
            .forEach((ele) => {
              ele.onclick = null;
              ele.addEventListener('click', this.entryWord.bind(this));
            });
        }, 30);
      },
      error: (HttpErrorResponse) => {
        console.log(HttpErrorResponse.message); // show error message, if any.
      },
    });
  }

  expand_big(event: Event): void {
    const div = event.currentTarget as HTMLDivElement;
    div?.setAttribute('style', 'display:none');
    div?.parentElement?.querySelector('.big_pic')?.setAttribute('style', 'display:block');
  }
  expand_thumb(event: Event): void {
    const div = event.currentTarget as HTMLDivElement;
    div.setAttribute('style', 'display:none');
    div.parentElement?.querySelector('.pic_thumb')?.setAttribute('style', 'display:block');
  }
  entryWord(event: Event) {
    event.preventDefault();
    const ele = event?.currentTarget as HTMLAnchorElement;
    const entry = ele.href.split('//')[1];
    this.value = entry;
    this.lookup(event);
  }
}
