import { Component } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';
import { User } from '../Models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username!: string;
  password!: string;
  user!: User;

  constructor(private loginService: LoginService, private router: Router) { }

  login(event: Event)
  {
    event.preventDefault();
    this.loginService.login(this.username, this.password).subscribe(data => {
      this.user = data;
      
      if (this.user) {
        this.router.navigate(['/home']);
      }
    }, error => {
      console.error('Login failed', error);
    });
  }
}
