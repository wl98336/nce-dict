import { NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  viewChild,
} from '@angular/core';
import { diffChars } from 'diff';

@Component({
  selector: 'typing-sentence',
  imports: [NgClass],
  templateUrl: './sentence-typing.html',
  styleUrl: './sentence-typing.scss',
})
export class Sentence implements OnChanges {
  @Input() content: string = '';
  @ViewChild('typing') inputBox!: ElementRef;
  @Output() complete = new EventEmitter();
  @Output() focus = new EventEmitter();
  @Output() blur = new EventEmitter();

  typedChars: any[] = [];
  targetChars: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content']) {
      this.targetChars = this.content;
      this.typedChars = [];
      if (this.inputBox) {
        this.inputBox.nativeElement.value = '';
      }
    }
  }
  onInput(event: any, value: string): void {
    const oldValue = this.content.substring(0, value.length);
    this.typedChars = diffChars(oldValue, value).filter((change) => {
      return !change.added;
    });

    this.targetChars = this.content.substring(value.length);
    if (this.typedChars.length == 1 && this.targetChars.length == 0) {
      this.complete.emit();
    }
  }
  onFocus(event: any) {
    this.focus.emit();
  }
  onBlur(event: any) {
    this.blur.emit();
  }
}
