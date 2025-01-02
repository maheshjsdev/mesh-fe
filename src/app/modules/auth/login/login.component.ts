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
  forgetForm: FormGroup;
  isLoginPage: boolean = true;
  forgetBtnName: string = 'Verify';
  isEmailVerified: boolean = false;
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
    this.forgetForm = this._fb.group({
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
            res.user.token = res.token;
            this._sharedServ.setCurrentUser = res.user;
            this._sharedServ.AuthGaurdMsg = res.success;
            this._sharedServ.setToken = res.token;
            this._sharedServ.isAuthenticated.next(true);
            this._router.navigateByUrl('/home');
            this.loginForm.reset();
          } else {
            this.loginForm.reset();
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Invaild email or password !',
              showConfirmButton: false,
              timer: 2000,
            });
          }
        },
        error: (res) => {
         this._sharedServ.errorPopup();
        },
      });
    }
  };
  forgetClicked = () => {
    this.isLoginPage = false;
  };
  backToLogin = () => {
    this.isLoginPage = true;
  };

  verifyClicked = () => {
    const formData = this.forgetForm.getRawValue();
    this._authServ.verifyingEmail(formData).subscribe({
      next: (res: any) => {
        this.isEmailVerified = res.success;
        this.forgetBtnName = 'Reset Password';
        if (res.result.affectedRows == 1) {
          this._sharedServ.successPopup();
          this.backToLogin();
          this.forgetForm.reset();
          this.loginForm.reset();
        }
      },
      error: (res) => {
        this._sharedServ.errorPopup();
      },
    });
  };
}
