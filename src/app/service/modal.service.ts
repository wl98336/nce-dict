import { Injectable, signal, Type, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modal: WritableSignal<{
    show: boolean;
    type?: Type<any>;
    header?: any;
    cssClasses?: string;
    clean?: boolean;
    nextNav?: string;
  }> = signal({ show: false });
}
