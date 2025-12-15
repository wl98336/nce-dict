import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmpwd: string = '';
  constructor(private auth: AuthService) {
    console.log('Register constructor');
  }
  submit(event: any) {
    if (this.password !== this.confirmpwd) return;
    this.auth.register(this.username, this.email, this.password).subscribe({
      next(data) {
        console.log('registered', data);
      },
      error(err) {
        console.error(err);
      },
    });
  }
  async login(event: MouseEvent) {
    this.auth.showLoginModal();
    event.preventDefault();
  }
}
