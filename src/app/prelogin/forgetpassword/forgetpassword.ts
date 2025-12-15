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
  constructor(private auth: AuthService){

  }
  submit(event: MouseEvent){
    
  }
}
