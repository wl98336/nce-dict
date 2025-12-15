import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { JSEncrypt } from 'jsencrypt';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  publicKey: string = '';
  toast = signal('');
  userSg: WritableSignal<{ username?: string; role?: string }> = signal({});
  user: { username?: string; role?: string } = {};
  isCustomer() {
    return !!this.user.username;
  }
  private authApi = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    const token = isPlatformBrowser(this.platformId) ? localStorage.getItem('token') : null;
    if (token) {
      this.user = JSON.parse('' + localStorage.getItem('user'));
      this.userSg.set(this.user);
      this.valid().subscribe({
        next: (data) => {
          console.log('valid user', this.user);
        },
        error: (error) => {
          this.logout();
          window.location.reload();
        },
      });
    }
    const serverPublicKey = localStorage.getItem('SERVERPUBLICKEY');
    if (!serverPublicKey) {
      this.getPublicKey().subscribe((key) => {
        localStorage.setItem('SERVERPUBLICKEY', key);
        this.publicKey = key as string;
      });
    } else {
      this.publicKey = serverPublicKey;
    }
  }
  getPublicKey() {
    return this.http.get(`${this.authApi}/key`, { responseType: 'text' });
  }
  valid() {
    return this.http.get(`${this.authApi}/valid`);
  }
  login(username: string, password: string) {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(this.publicKey);
    const encryptpwd = encrypt.encrypt(password);
    return this.http.post(`${this.authApi}/login`, { username, encryptpwd }).pipe(
      map((data) => {
        const { username, role, token } = data as any;
        this.user = { username, role };
        this.userSg.set(this.user);
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('token', token);
        return data;
      })
    );
  }

  register(username: string, email: string, password: string) {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(this.publicKey);
    const encryptpwd = encrypt.encrypt(password);
    return this.http.post(`${this.authApi}/register`, { username, email, encryptpwd });
  }

  logout() {
    this.userSg.set({});
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}
