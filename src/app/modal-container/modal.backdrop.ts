import { NgClass, NgStyle } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { ModalService } from '../service/modal.service';

@Component({
  selector: 'modal-backdrop',
  imports: [NgClass, NgStyle],
  template: `<div
    class="modal-backdrop fade"
    [ngClass]="{ show: show() }"
    [ngStyle]="{ display: show() ? 'block' : 'none' }"
  ></div> `,
})
export class ModalBackdrop {
  show = computed(() => this.modalService.modal().show);
  constructor(private modalService: ModalService) {}
}
