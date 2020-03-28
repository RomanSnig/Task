import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TaskModel} from '../models/task';
import {FindTasks} from '../models/findTasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get('http://localhost:3000/task/getTasks');
  }
  createTask(t: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>('http://localhost:3000/task/create', t);
  }
  changeTask(t: TaskModel): Observable<TaskModel> {
    return this.http.put<TaskModel>('http://localhost:3000/task/changeTask', t);
  }
  deleteTask(t: TaskModel): Observable<TaskModel> {
    return this.http.delete<TaskModel>('http://localhost:3000/task/deleteTask/' + t);
  }
  findTasks(subject) {
    return this.http.get('http://localhost:3000/task/findTasks/' + subject);
  }

}
