import { Injectable, signal, Type, WritableSignal } from '@angular/core';

export interface Toast {
  severity?: string;
  placement?: string;
  title: string;
  subTitle?: string;
  msg: string;
  confirmLbl?: string;
  rejectLbl?: string;
  onConfirm?: () => void;
  onReject?: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: WritableSignal<Toast[]> = signal([]);

  showToast(toast: Toast) {
    this.toasts.update((toasts) => [...toasts, toast]);
  }
  closeToast(toast: Toast) {
    this.toasts.update((toasts) => toasts.filter((item) => item !== toast));
  }
  closeAllToasts() {
    this.toasts.set([]);
  }
}
