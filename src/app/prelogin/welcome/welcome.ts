import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

@Component({
  selector: 'app-welcome',
  imports: [Footer, Header, RouterOutlet],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome {}
