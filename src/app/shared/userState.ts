export class currentUserState {
  private firstName?: string;
  private lastName?: string;
  private email?: string;
  private authMsg?: string;
  private token?: string;

  set setCurrentUser(CurrentUser: any) {
    this.firstName = CurrentUser.first_name;
    this.lastName = CurrentUser.last_name;
    this.email = CurrentUser.email;
    this.token = CurrentUser.token;
    this.authMsg = CurrentUser.msg;
  }

  set authGaurdMsg(msg: any) {
    this.authMsg = msg;
  }

  getFirstName() {
    return this.firstName;
  }
  getLastName() {
    return this.lastName;
  }
  getEmail() {
    return this.email;
  }
  getAuthMsg() {
    return this.authMsg;
  }
  get getToken() {
    return this.token;
  }
}
