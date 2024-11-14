// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-login',
  standalone:true,
  templateUrl: './login.component.html',
  imports:[FormsModule,MatTabsModule,RegisterComponent]
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login({ username: this.username, password: this.password }).subscribe(
      (res: any) => {
        debugger
        localStorage.setItem('token', res.token);
        this.router.navigate(['/tasks']);
      },
      (error) => alert(error.error.msg)
    );
  }

  register(){
    this.router.navigate(['/register'])
  }
}
