import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BgpPeeringService {
  constructor(private http: HttpClient) { }

  api_path = 'http://localhost:3000/api/upload';

  getUploadedIp() {
    return this.http.get(this.api_path + '/getUploadData');
  }

  uploadExcelIp(data: any) {
    return this.http.post(this.api_path + '/fileUpload', data);
  }

  getUserList() {
    return this.http.get('http://localhost:3000/api/user/getUser');
  }
}
