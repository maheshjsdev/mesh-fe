import { Component, Inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  addUserForm: FormGroup;
  formName: string;
  formBtn: string;
  hide = signal(true);
  isPasswordField: boolean = true;
  constructor(
    private _fb: FormBuilder,
    private _userServ: UserService,
    private _dialog: MatDialog,
    public dialogRef: MatDialogRef<UserFormComponent>,
    private _sharedServ:SharedService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addUserForm = this._fb.group({
      id: [''],
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(8)]],
      mobile_no: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(12),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ],
      ],
    });
    this.formName = this.data.actionKey === 'add' ? 'Add' : 'Update';
    this.formBtn = this.data.actionKey === 'add' ? 'Save' : 'Update';
    if (this.data.actionKey === 'edit') {
      this.editUser();
      this.isPasswordField = false;
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  closePopup = (ele: string) => {
    this.dialogRef.close(ele);
  };

  editUser = () => {
    this.addUserForm.patchValue(this.data.user);
  };

  saveUserClicked = (action?: string) => {
    if (this.data.actionKey === 'add') {
      var formData = this.addUserForm.getRawValue();
      formData.user_status = 1;
      console.log(formData);

      this._userServ.addUser(formData).subscribe({
        next: (res) => {
        this._sharedServ.successPopup();
          this.closePopup('popupDone');
          this.addUserForm.reset();
        },
        error: (res) => {
          this._sharedServ.errorPopup();
        },
      });
    } else {
      var formData = this.addUserForm.getRawValue();
      this._userServ.editUser(formData).subscribe({
        next: (res) => {
          this._sharedServ.successPopup();
          this.closePopup('popupDone');
          this.addUserForm.reset();
        },
        error: (res) => {
          this._sharedServ.errorPopup();
        },
      });
    }
  };
}
