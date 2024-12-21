export class currentUserState {
  private firstName?: string;
  private lastName?: string;
  private email?: string;
  private authMsg?: any;

  set setCurrentUser(CurrentUser: any) {
    this.firstName = CurrentUser.first_name;
    this.lastName = CurrentUser.last_name;
    this.email = CurrentUser.email;
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
}
