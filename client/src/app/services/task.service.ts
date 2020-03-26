import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TaskModel} from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get('http://localhost:3000/task/getTasks');
  }
  createTask(t: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>('http://localhost:3000/user/register', t);
  }
}
