import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ModalService } from '../../service/modal.service';

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
  constructor(private auth: AuthService, private router: Router, private modalService: ModalService) {
    console.log("Login constructor")
  }
  updateUsername(event: Event) {
    console.log('====', (event.target as HTMLInputElement).value);
    this.username = (event.target as HTMLInputElement).value;
  }
  async forgetPassword(event: MouseEvent) {
    this.auth.showForgetPassword();
    event.preventDefault();
  }
  async register(event: MouseEvent) {
    this.auth.showRegisterModal();
    event.preventDefault();
  }
  login(event: any) {
    this.auth.login(this.username, this.password).subscribe({
      next: (data) => {
        this.router.navigate(['/dashboard']);
        this.modalService.modal.set({show: false});
      },
      error: (error) => {
        console.error('login error', error);
      },
    });
  }
}
