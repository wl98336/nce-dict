import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DictService } from '../../service/dict.service';
@Component({
  selector: 'app-dictionary',
  imports: [FormsModule],
  templateUrl: './dictionary.html',
  styleUrl: './dictionary.scss',
})
export class Dictionary {
  value: string = '';
  safeHtmlContent: SafeHtml = '';
  constructor(
    private dictService: DictService,
    private sanitizer: DomSanitizer,
    private ref: ChangeDetectorRef
  ) {
    console.log("Dictionary constructor");
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.lookup(event);
    }
  }
  lookup(event: any): void {
    this.dictService.lookupDict(this.value).subscribe({
      next: (data) => {
        this.safeHtmlContent = this.sanitizer.bypassSecurityTrustHtml((data as any).definition);
        const domParser = new DOMParser();
        const dict = domParser.parseFromString((data as any).definition, 'text/html');
        console.log('dict', dict.body.children, dict.body.childNodes);
        this.ref.markForCheck();
      },
      error: (HttpErrorResponse) => {
        console.log(HttpErrorResponse.message); // show error message, if any.
      },
    });
  }
}
