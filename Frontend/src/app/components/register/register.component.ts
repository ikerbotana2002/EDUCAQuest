import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  name: string = '';
  lastname: string = '';
  email: string = '';
  rol_id: number = 0;
  password: string = '';
  repeatPassword: string = '';

  constructor(private toastr: ToastrService, private _userService: UserService, private router: Router) {}
  ngOnInit(): void {}

  addUser(){
    if(this.name == '' || this.lastname == '' ||  this.email == '' || this.password == '' || this.repeatPassword == ''){
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    if(this.password != this.repeatPassword){
      this.toastr.warning('Las contraseñas no coinciden', 'Warning');    
      return;
    }

    const user: User = {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      rol_id: this.rol_id,
      avatar: 0,
    }

    // llama al metodo register del User.Service.ts pasandole el objeto user con los datos del usuario introducidos en el front
    this._userService.register(user).subscribe({
        next: (v) => {
          this.toastr.success(`Usuario ${this.name} registrado`, '');
          this.router.navigate(['/login']);
        }, 
        error: (e: HttpErrorResponse) => {
          if (e.error.message) { 
            this.toastr.error(e.error.message, '');
          } else {
            this.toastr.error('Error en el servidor', '');
          }
        }
    });
  }
}
