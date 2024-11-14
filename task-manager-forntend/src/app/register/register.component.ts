// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone:true,
  imports:[FormsModule]
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register({ username: this.username, password: this.password }).subscribe(
      (res) => this.router.navigate(['/login']),
      (error) => alert(error.error.msg)
    );
  }

  login(){
    this.router.navigate(['/login'])
  }
  
}
