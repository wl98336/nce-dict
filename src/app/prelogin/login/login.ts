import { Component, input, signal } from '@angular/core';
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
  haveLogin = signal(false);
  username: string = '';
  password: string = '';
  save: boolean = false;
  nextNav = input('');
  constructor(
    private auth: AuthService,
    private router: Router,
    private modalService: ModalService
  ) {
    this.auth.valid().subscribe({
      next: (data) => {
        this.haveLogin.set(true);
        this.username = this.auth.user.username!;
        this.save = true;
      },
      error: (error) => {
        this.haveLogin.set(false);
      },
    });
  }
  updateUsername(event: Event) {
    this.haveLogin.set(false);
    this.username = (event.target as HTMLInputElement).value;
  }
  rememberChanged(event: Event) {
    this.save = (event.target as HTMLInputElement).checked;
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
    if (this.haveLogin()) {
      this.router.navigate(['/dashboard']);
      this.modalService.modal.set({ show: false, clean: true });
    } else {
      this.auth.login(this.username, this.password, this.save).subscribe({
        next: (data) => {
          const nextUrl = this.nextNav() ? this.nextNav() : '/dashboard';
          this.router.navigate([nextUrl]);
          this.modalService.modal.set({ show: false, clean: true });
        },
        error: (error) => {
          console.error('login error', error);
        },
      });
    }
  }
}
