import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {HttpClient} from '@angular/common/http';
import {TaskModel} from '../models/task';
import {TaskService} from '../services/task.service';
import {ApiRes} from '../models/ApiRes';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  isTokenPresent = {
    id: null,
    name: '',
    email: ''
  };
  AllTasks: TaskModel = {
    id: null,
    name: '',
    email: '',
    user: null,
    info: '',
    subject: ''
  };
  userTasks: TaskModel[] = [{
    subject: '',
    info: '',
    id: null,
    user: null,
    email: '',
    name: ''
  }];
  taskEvent = false;
  myTaskChange = false;
  constructor(private http: HttpClient,
              private dataService: TaskService,
              private router: Router) { }

  Exit() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  ngOnInit() {
    const getItem = localStorage.getItem('token');
    const getTask = localStorage.getItem('task');
    this.userTasks = JSON.parse(getTask);
    this.isTokenPresent = JSON.parse(getItem);
    this.AllTasks = JSON.parse(getTask);
  }
taskButton() {
    this.taskEvent = !this.taskEvent;
}
newTask(TaskForm: TaskModel) {
    TaskForm.name = this.isTokenPresent.name;
    TaskForm.email = this.isTokenPresent.email;
    TaskForm.user = this.isTokenPresent.id;
    console.log(TaskForm);
    return this.dataService.createTask(TaskForm).subscribe((newTask: any) => {
      console.log(newTask);
      localStorage.setItem('task', JSON.stringify(newTask.tasks));
      this.taskEvent = false;
      this.router.navigate(['/userPage']);
    }, error => {
      console.log(error);
      alert(error.error.msg);
    });
}
editTask(editTaskForm: TaskModel) {
    console.log(editTaskForm);
    return this.dataService.changeTask(editTaskForm).subscribe((chengedTask: any) => {
      console.log('*********');
      console.log(chengedTask.tasks);
      console.log('*********');
      localStorage.setItem('task', JSON.stringify(chengedTask.tasks));
      this.myTaskChange = !this.myTaskChange;
    },  error => {
      console.log(error);
      alert(error.error.msg);
    });
}
editButton() {
    this.myTaskChange = !this.myTaskChange;
}
deleteButton(deleteForm) {
    console.log(deleteForm);
    return this.dataService.deleteTask(deleteForm).subscribe((justDeleted: any) => {
      console.log(justDeleted);
      localStorage.setItem('task', JSON.stringify(justDeleted.tasks));
    }, error => {
      console.log(error);
      alert(error.error.msg);
    });
}
}
