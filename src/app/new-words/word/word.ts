import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'word-card',
  imports: [NgClass],
  templateUrl: './word.html',
  styleUrl: './word.scss',
})
export class WordCard {
  hideEN = input(false);
  hideZH = input(false);
  word = input<string>(' [] .');
  wordInfo = computed(() => {
    const array = this.word().split(/\[|\]/);
    const trans = array[2].split('.');
    return {
      word: array[0],
      phonetic: array[1],
      prop: trans.length > 1 ? trans[0] : '',
      trans: trans.length > 1 ? trans[1] : trans[0],
    };
  }, undefined);
}
