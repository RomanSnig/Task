import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TaskService} from '../services/task.service';
import {TaskModel} from '../models/task';
import {FindTasks} from '../models/findTasks';
import {ApiRes} from '../models/ApiRes';
import {Router} from '@angular/router';

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
  subject: '',
  user: null,
  id: null
}];
  constructor(private http: HttpClient,
              private dataService: TaskService,
              private router: Router) { }

  ngOnInit() {
    this.tasks();
  }
  tasks() {
     this.dataService.getTasks().subscribe((res: TaskModel[]) => {
      this.task = res;
      console.log(this.task);
    });
  }
  findTasks(subject) {
    console.log(Object.values(subject));
    return this.dataService.findTasks(Object.values(subject)).subscribe((res: any) => {
      console.log(res.tasks);
      if (res.tasks.length > 0) {
        localStorage.setItem('foundTasks', JSON.stringify(res.tasks));
        this.router.navigate(['/tasks/foundTasks']);
      } else {alert('No tasks on your request!');
      }
      console.log(res);
      // console.log(this.task);
    });
  }
}
