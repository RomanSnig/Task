import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {ApiRes} from '../models/ApiRes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(    private authService: UserService,
                  private router: Router) { }

  ngOnInit() {
  }
  authUser(loginForm) {
    this.authService.loginUser(loginForm).subscribe((data: ApiRes) => {
      // localStorage.setItem('token', 'res');
      console.log(data.success);
      console.log(data.msg);
      console.log(data.user);
      // if (data.success === true) {
      localStorage.setItem('token', JSON.stringify(data.user));
      // localStorage.setItem('token', JSON.stringify(data.msg));
      // }
      // localStorage.setItem('token', data.msg);
      console.log(localStorage);
      console.log(loginForm);
      console.log(data);
      this.router.navigate(['/userPage']);
    }, error => {
      console.log(error);
      alert(error.error.msg);
    } );
  }
}
