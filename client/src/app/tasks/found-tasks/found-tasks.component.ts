import { Component, OnInit } from '@angular/core';
import {TaskModel} from '../../models/task';
import {HttpClient} from '@angular/common/http';
import {TaskService} from '../../services/task.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-found-tasks',
  templateUrl: './found-tasks.component.html',
  styleUrls: ['./found-tasks.component.css']
})
export class FoundTasksComponent implements OnInit {
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
    const getTask = localStorage.getItem('foundTasks');
    this.task = JSON.parse(getTask);
    console.log(this.task);
  }
  findTasks(subject) {
    console.log(Object.values(subject));
    return this.dataService.findTasks(Object.values(subject)).subscribe((res: any) => {
      console.log(res);
      if (res.tasks.length > 0) {
        localStorage.setItem('foundTasks', JSON.stringify(res.tasks));
        this.task = res.tasks;
      } else {alert('No tasks on your request!');
    }
  });
}
toAllTasks() {
    localStorage.removeItem('foundTasks');
    this.router.navigate(['/tasks']);
}
}
