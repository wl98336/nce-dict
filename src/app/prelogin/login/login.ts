import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  id: number = 0;
  username: string = '';
  password: string = '';
  constructor(private auth: AuthService, private router: Router) {}
  updateUsername(event: Event) {
    console.log('====', (event.target as HTMLInputElement).value);
    this.username = (event.target as HTMLInputElement).value;
  }
  forgetPassword(event: MouseEvent) {
    this.router.navigate(['/forgetpassword']);
    event.preventDefault();
  }
  register(event: MouseEvent) {
    this.router.navigate(['/register']);
    event.preventDefault();
  }
  login(event: any) {
    this.auth.login(this.username, this.password).subscribe({
      next: (data) => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('login error', error);
      },
    });
  }
}
