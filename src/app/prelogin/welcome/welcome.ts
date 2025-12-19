import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { ModalContainer } from '../../modal-container/modal.container';
import { ToastContainer } from '../../toast-container/toast-container';

@Component({
  selector: 'app-welcome',
  imports: [Footer, Header, RouterOutlet, ModalContainer, ToastContainer],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome {}
