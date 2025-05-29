import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';

  constructor(private toastr: ToastrService, private _userService: UserService, private router: Router, private http: HttpClient) {}

  onSubmit(): void {

    this._userService.forgotPassword(this.email).subscribe({
      next: (v: any) => {
        this.toastr.success(`Email a ${this.email} enviado`, '');
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


