import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  isTokenPresent: any;
  socket: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e) => {
      this.isTokenPresent = localStorage.getItem('token');
    });
    this.isTokenPresent = localStorage.getItem('token');
  }
}
