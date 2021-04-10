import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    userName: "",
    password: "",
    _id: null
  };

  warning: any = null;
  loading: boolean = false;

  private loginSub;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

    if (this.user.userName !== "" && this.user.password !== "") {

      this.loading = true;
      this.loginSub = this.auth.login(this.user).subscribe((data) => {
        
        this.loading = false;
        localStorage.setItem("access_token", data.token);
        this.router.navigate(['/newReleases']);

      },
      (err) => {
        this.loading = false;
        this.warning = err.error.message;
      });

    } else {

      this.warning = "The username and password fields cannot be empty.";

    }

  }

}
