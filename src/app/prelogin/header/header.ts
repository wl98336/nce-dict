import { Component, computed } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  user = computed(() => this.auth.userSg());
  constructor(private auth: AuthService) {}
  login(event: Event) {
    this.auth.showLoginModal();
  }
}
