import { Component, computed } from '@angular/core';
import { Toast, ToastService } from '../service/toast.service';

@Component({
  selector: 'app-toast-container',
  imports: [],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.scss',
})
export class ToastContainer {
  toastList = computed(() => this.toastService.toasts());
  constructor(private toastService: ToastService) {}

  onReject(toast: Toast) {
    if (toast.onReject) {
      toast.onReject();
    }
    this.toastService.closeToast(toast);
  }
  onConfirm(toast: Toast) {
    if (toast.onConfirm) {
      toast.onConfirm();
    }
    this.toastService.closeToast(toast);
  }
}
