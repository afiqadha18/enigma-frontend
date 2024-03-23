import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Peer } from '../model/peer.model';

@Injectable({
  providedIn: 'root'
})
export class BgpPeeringService {
  peerList: Peer[]= [];
  peerUpdated = new Subject<Peer[]>();
  constructor(private http: HttpClient) { }

  api_path = 'http://localhost:3001/api/upload';
  bgp_path = 'http://localhost:3001/api/bgp';

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
    return this.http.get('http://localhost:3001/api/user/getUser');
  }

  getPeerList() {
    this.http.get('http://localhost:3001/api/bgp/bgpPeer')
      .subscribe((peerData: any) => {
        this.peerList = peerData.data;
        this.peerUpdated.next([...this.peerList]);
      })
  }

  getPeerUpdateListener() {
    return this.peerUpdated.asObservable();
  }

  addPeer(data: any) {
    return this.http.post('http://localhost:3001/api/bgp/bgpPeer', data);
  }

  editPeer(data: any) {
    return this.http.put('http://localhost:3001/api/bgp/bgpPeer', data);
  }

  deletePeer(peerIp: string) {
    return this.http.delete(`http://localhost:3001/api/bgp/bgpPeer/${peerIp}`);
  }

}
