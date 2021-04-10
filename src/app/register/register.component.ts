import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RegisterUser } from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser: RegisterUser = {
    userName: "",
    password: "",
    password2: ""
  };

  warning: any = null;
  success: boolean = false;
  loading: boolean = false;

  private regSub;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

    if (this.registerUser.userName != "" && this.registerUser.password === this.registerUser.password2) {

      this.loading = true;

      this.regSub = this.auth.register(this.registerUser).subscribe((_data) => {
        this.success = true;
        this.loading = false;
        this.warning = null;
      },
      (err) => {
        this.success = false;
        this.loading  = false;
        this.warning = err.error.message;
      });

    } else {

      this.success = false;
      this.loading = false;

      if (this.registerUser.userName === "") {
        this.warning = "You must enter a username.";
      } else if (this.registerUser.password !== this.registerUser.password2) {
        this.warning = "Both password fields must match.";
      }

    }

  }

  ngOnDestroy(): void {
    this.regSub.unsubscribe();
  }

}
