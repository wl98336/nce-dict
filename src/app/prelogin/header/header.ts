import { Component, computed } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  user = computed(()=> this.auth.userSg());
  constructor(private auth: AuthService, private router: Router){}
  login(event: Event){
    this.router.navigate(['/login']);
  }
}
