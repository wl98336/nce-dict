import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalContainer } from './modal-container/modal.container';
import { ToastContainer } from './toast-container/toast-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ModalContainer, ToastContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('nce-dict');

}
