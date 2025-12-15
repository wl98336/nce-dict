import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgetpassword',
  imports: [FormsModule],
  templateUrl: './forgetpassword.html',
  styleUrl: './forgetpassword.scss',
})
export class Forgetpassword {
  username: string = '';
  code: string = '';
  password: string = '';
  constructor(private auth: AuthService) {}
  submit(event: MouseEvent) {}

  async login(event: MouseEvent) {
    this.auth.showLoginModal();
    event.preventDefault();
  }

  async register(event: MouseEvent) {
    this.auth.showRegisterModal();
    event.preventDefault();
  }
}
