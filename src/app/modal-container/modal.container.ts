import {
  ApplicationRef,
  Component,
  ComponentRef,
  computed,
  createComponent,
  effect,
  ElementRef,
  EmbeddedViewRef,
  EnvironmentInjector,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from '../service/modal.service';
import { NgClass, NgStyle } from '@angular/common';
import { ModalBackdrop } from './modal.backdrop';

@Component({
  selector: 'modal-container',
  imports: [NgClass, NgStyle, ModalBackdrop],
  templateUrl: './modal.container.html',
  styleUrl: './modal.container.scss',
})
export class ModalContainer {
  modal = computed(() => this.modalService.modal());
  show = computed(() => this.modalService.modal().show);
  @ViewChild('inner') innerElement!: ElementRef<HTMLDivElement>;

  private modalMap = new Map<string, ComponentRef<any>>();
  private modalKey = '';
  constructor(
    private modalService: ModalService,
    private vcr: ViewContainerRef,
    private eI: EnvironmentInjector,
    private appRef: ApplicationRef
  ) {
    effect(() => {
      const modal = this.modalService.modal();
      if(modal.clean){
        this.modalMap.clear();
      }
      if (modal.show && modal.type) {
        if (this.modalKey && this.modalMap.get(this.modalKey)) {
          const viewRef = this.modalMap.get(this.modalKey)?.hostView;
          if (viewRef) {
            this.appRef.detachView(viewRef);
          }
        }
        this.modalKey = modal.type.name;
        console.log('modal name', this.modalKey);
        let cref = this.modalMap.get(this.modalKey);
        if (!cref) {
          cref = createComponent(modal.type, {
            //hostElement: this.hostElement,
            environmentInjector: this.eI,
          });
          this.modalMap.set(modal.type.name, cref);
        }
        cref.setInput("nextNav", modal.nextNav);
        this.appRef.attachView(cref.hostView);
        this.innerElement.nativeElement.appendChild(
          (cref.hostView as EmbeddedViewRef<any>).rootNodes[0]
        );
        //this.innerElement.nativeElement.appendChild(this.hostElement)
      } else {
        const viewRef = this.modalMap.get(this.modalKey)?.hostView;
        if (viewRef) {
          this.appRef.detachView(viewRef);
        }
      }
    });
  }

  closeModal(): void {
    this.modalService.modal.update((modal) => {
      return { ...modal, show: false };
    });
  }
}
