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
  bgp_path = 'http://localhost:3000/api/bgp';

  getUploadedIp() {
    return this.http.get(this.api_path + '/getUploadData');
  }

  uploadExcelIp(formdata: any) {
    return this.http.post(this.api_path + '/fileUpload', formdata);
  }

  addIpAddress(data: any) {
    return this.http.post(this.api_path + '/addIp', data);
  }

  getUserList() {
    return this.http.get('http://localhost:3000/api/user/getUser');
  }

  getPeerList() {
    return this.http.get('http://localhost:3000/api/bgp/bgpPeer');
  }

  addPeer(data: any) {
    return this.http.post('http://localhost:3000/api/bgp/bgpPeer', data);
  }

  editPeer(data: any) {
    return this.http.put('http://localhost:3000/api/bgp/bgpPeer', data);
  }

  deletePeer(peerIp: string) {
    return this.http.delete(`http://localhost:3000/api/bgp/bgpPeer/${peerIp}`);
  }

}
