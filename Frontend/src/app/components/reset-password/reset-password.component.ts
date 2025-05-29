import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})

export class ResetPasswordComponent implements OnInit {
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private _userService: UserService
  ) {}
  

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.toastr.error('Las contraseñas no coinciden');
      return;
    }

    this._userService.resetPassword(this.newPassword, this.token).subscribe({
      next: (v: any) => {
        this.toastr.success(`Contraseña cambiada con éxito`, '');
        this.router.navigate(['/login']);
      }, 
      error: (e: HttpErrorResponse) => {
        if (e.error.message) { 
          this.toastr.error('Error en el servidor', '');
        } else {
          this.toastr.error('Error2 en el servidor', '');
        }
      }
    });
  }
}
