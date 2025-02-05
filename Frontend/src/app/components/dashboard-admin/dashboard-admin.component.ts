import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  standalone: false,
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'] // Nota: Cambié "styleUrl" a "styleUrls"
})

export class DashboardAdminComponent implements OnInit {
  users: any[] = [];
  id_user: number = 0;


  constructor(private userService: UserService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      // Asegúrate de inicializar `selectedOption` para cada usuario
      this.users = data.map((user) => ({ ...user, selectedOption: null }));
    });

    const userIdString = localStorage.getItem('user_id');
    if (userIdString) {
      this.id_user = parseInt(userIdString, 10); // Asigna el id del usuario actual
    }
  }

  getRolName(rolId: number): string {
    switch (rolId) {
      case 0:
        return 'ALUMNO';
      case 1:
        return 'PROFESOR';
      case 2:
        return 'ADMIN';
      case 3:
        return 'PADRE';
      default:
        return 'DESCONOCIDO';
    }
  }


  saveChanges(email: string, rol_id: number): void {
    this.userService.updateRol(rol_id, email).subscribe({
      next: (v) => {
        this.toastr.success(`Rol actualizado`, '');
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
