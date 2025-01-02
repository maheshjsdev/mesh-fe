import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserFormComponent } from '../user-form/user-form.component';
import Swal from 'sweetalert2';
import { SharedService } from '../../../shared/shared.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: false,

  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent implements OnInit {
  statusText?: string;
  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'email',
    'mobile_no',
    'user_status',
  ];
  dataSource = new MatTableDataSource<any>([]);
  constructor(
    private _dialog: MatDialog,
    private _sharedServ: SharedService,
    private _userServ: UserService
  ) {
    this._sharedServ.isAuthenticated.next(true);
    this.getUser();
  }
  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog(user?: any, action?: string) {
    const dialog = this._dialog.open(UserFormComponent, {
      data: { user: user, actionKey: action },
    });
    dialog.afterClosed().subscribe((res) => {
      if (res === 'popupDone') {
        this.getUser();
      }
    });
  }

  getUser = () => {
    this._userServ.getAllUser().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource<any>(res);
    });
  };

  changeUserStatus = (id?: number, status?: any) => {
    this.statusText = status === 1 ? 'Active' : 'Inactive';
    status = status === 1 ? false : true;
    const formData = {
      id: id,
      user_status: status,
    };
    Swal.fire({
      title: `Are you sure to change ${this.statusText} status ?`,
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this._userServ.chnageUserStatus(formData).subscribe({
          next: (res) => {
            this.getUser();
            this._sharedServ.successPopup();
          },
          error: (res) => {
          this._sharedServ.errorPopup();
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.getUser();
      }
    });
  };
  deleteUserClicked = (id?: number) => {
    const formData = {
      id: id,
    };
    Swal.fire({
      title: 'Are you sure to delete ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this._userServ.deleteUser(formData).subscribe({
          next: (res) => {
            this.getUser();
            this._sharedServ.successPopup();
          },
          error: (res) => {
            this._sharedServ.errorPopup();
          },
        });
      }
    });
  };
}
