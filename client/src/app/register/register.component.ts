import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {User} from '../models/user';

@Component ({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  User: User[] = [];
  constructor(private userService: UserService,
              private router: Router
  ) { }

  ngOnInit() {
  }
  registerUser(registerForm: User) {
    return this.userService.createUser(registerForm).subscribe((newPerson) => {
        this.User.push(newPerson);
        console.log(newPerson);
        localStorage.setItem('token', JSON.stringify(newPerson.msg));
        this.router.navigate(['/userPage']);
      },
      error => {
        console.log(error);
        alert(error.error.msg);
      });
  }
}
