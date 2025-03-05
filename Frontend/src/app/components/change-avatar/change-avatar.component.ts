import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.component.html',
  standalone: false,
  styleUrls: ['./change-avatar.component.css']
})
export class ChangeAvatarComponent {
  selectedFile: File | null = null;
  errorMessage: string | null = null;
  id_user: number = 0;
  base64String: string | null = null; // Nueva variable para la imagen en Base64
  selectedFileBase64: string | null = null; // Nueva variable para la imagen en Base64
  
  users: any[] = [];

  constructor(
    private http: HttpClient,
    private _userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userIdString = localStorage.getItem('user_id');
    if (userIdString) {
      this.id_user = parseInt(userIdString, 10);
    }

    this._userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.size <= 100 * 1024) { // 100 KB límite
        this.errorMessage = null;
        this.selectedFile = file;

        // Convertir imagen a Base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.base64String = reader.result as string;
          // Eliminar el prefijo "data:image/png;base64," o similar
          const cleanBase64 = this.base64String.split(',')[1];

          this.selectedFileBase64 = cleanBase64;
        };
      } else {
        this.selectedFile = null;
        this.selectedFileBase64 = null;
        this.errorMessage = 'El archivo debe ser de 100 KB o menos.';
      }
    }
  }

  onSubmit(): void {
    if (this.selectedFileBase64) {
      this._userService.updateAvatar(this.selectedFileBase64, this.id_user).subscribe({
        next: () => {
          this.toastr.success('Avatar actualizado con éxito');
          this.router.navigate(['/login']);
        },
        error: (e: HttpErrorResponse) => {
          this.toastr.error(e.error.message || 'Error en el servidor');
        }
      });
    } else {
      this.toastr.error('No has seleccionado un archivo válido');
    }
  }

  getRolName(rolId: number): string {
    switch (rolId) {
      case 0:
        return 'Alumno';
      case 1:
        return 'Profesor';
      case 2:
        return 'Admin';
      case 3:
        return 'Padre';
      default:
        return 'DESCONOCIDO';
    }
  }
}
