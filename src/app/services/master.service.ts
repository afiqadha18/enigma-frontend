import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  constructor(private http: HttpClient) { }

  activity_path = 'http://localhost:3000/api/logs';

  getActivityLogs() {
    return this.http.get(this.activity_path + '/getActivityLogs');
  }
}
