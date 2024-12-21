import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SharedService } from '../../../shared/shared.service';
import { Router } from '@angular/router';
import { UserService } from '../../users/user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = signal(true);
  constructor(
    private _fb: FormBuilder,
    private _sharedServ: SharedService,
    private _router: Router,
    private _userServ: UserService,
    private _authServ: AuthService
  ) {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  UserLoginClicked = () => {
    const formData = this.loginForm.getRawValue();

    if (formData && formData.email && formData.password) {
      this._authServ.userLogin(formData).subscribe({
        next: (res: any) => {
          if (res.success === true) {
            this._sharedServ.setCurrentUser = res.user;
            this._sharedServ.AuthGaurdMsg = res.success;
            this._sharedServ.isAuthenticated.next(true);
            this._router.navigateByUrl('/home');
            this.loginForm.reset();
          } else {
            this.loginForm.reset();
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Invaild email or password !',
            });
          }
        },
        error: (res) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        },
      });
    }
  };
}
