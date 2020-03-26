import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  isTokenPresent = {
    id: '',
    name: ''
  };
  constructor(private http: HttpClient,
              private dataService: UserService,
              private router: Router) { }

  Exit() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  ngOnInit() {
    const getItem = localStorage.getItem('token');
    this.isTokenPresent = JSON.parse(getItem);
  }

}
