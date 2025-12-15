import { Component, effect, signal, WritableSignal } from '@angular/core';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-welcome',
  imports: [Footer, Header, RouterOutlet],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome {
  toastList: WritableSignal<any[]> = signal([]);
  constructor(private auth: AuthService, private router: Router) {
    effect(() => {
      const toastKey = this.auth.toast();
      if (toastKey) {
        this.showToast(toastKey);
        this.auth.toast.set('');
      }
    });
  }
  showToast(key: string) {
    console.log("showToast", key);
    this.toastList.set([{}]);
  }
  closeToast(event: Event) {
    this.toastList.set([]);
  }
  toastAction(key: string, event: Event) {
    switch (key) {
      case 'login':
        this.closeToast(event);
        this.router.navigate(['login']);
        break;
      default:
        break;
    }
  }
}
