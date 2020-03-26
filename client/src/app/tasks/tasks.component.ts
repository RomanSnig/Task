import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TaskService} from '../services/task.service';
import {TaskModel} from '../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
task: TaskModel[] = [{
  email: '',
  info: '',
  name: '',
  subject: ''
}];
  constructor(private http: HttpClient,
              private dataService: TaskService) { }

  ngOnInit() {
    this.tasks();
  }
  tasks() {
    this.dataService.getTasks().subscribe((res: []) => {
      // this.users = res;
      this.task = res;
      console.log(this.task);
    });
  }
}
