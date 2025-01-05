import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  email: string = '';
  password: string = '';
  rol_id: number = 0;
  user_id: number = 0;

  constructor(private _userService: UserService, private router: Router, private toastr: ToastrService) { }

  login() {
    if (this.email == '' || this.password == '') {
      this.toastr.error('Todos los campos son obligatorios', '');
      return;
    }

    const user: User = { email: this.email, password: this.password };

    this._userService.login(user).subscribe({
      next: (response: any) => {
        const token = response.token;
        const rol_id = response.user.rol_id;
        const user_id = response.user.id;

        this.toastr.success(`Bienvenido ${this.email}`, '');

        if (rol_id === 1) {
          this.router.navigate(['/dashboardProfesor']);
        } else {
          this.router.navigate(['/dashboard']);
        }

        localStorage.setItem('user_id', user_id.toString());
        //localStorage.setItem('token', token); //guarda el token en el local storage
      },
      error: (e: HttpErrorResponse) => {
        if (e.error.message) {
          this.toastr.error(e.error.message, '');
        } else {
          this.toastr.warning('Email o contraseña incorrectos', '');
        }
      }
    });
  }

}
