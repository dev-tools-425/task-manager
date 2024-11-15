// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone:true,
  imports:[FormsModule,MatTabsModule,LoginComponent]
})


export class RegisterComponent {
  username = '';
  password = '';
  @Output() newItemEvent = new EventEmitter<string>();

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register({ username: this.username, password: this.password }).subscribe(
      (res) => 
        {console.log(res);
        alert(res.msg)
        this.newItemEvent.emit("0");
      }
      ,
      (error:any) => alert(error.error.msg)
    );
  }

  login(){
    this.router.navigate(['/login'])
  }

  
}
