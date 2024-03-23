import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Whitelist } from '../pages/ip-whitelist/ip-whitelist.component';

@Injectable({
  providedIn: 'root'
})
export class WhitelistService {
  whitelist: Whitelist[]= [];
  whitelistUpdated = new Subject<Whitelist[]>();
  constructor(private http: HttpClient) { }

  api_path = 'http://localhost:3000/api/whitelist';

  getWhitelistedIP() {
    this.http.get(this.api_path + '/ipWhitelist')
      .subscribe((listData: any) => {
        this.whitelist = listData.data;
        this.whitelistUpdated.next([...this.whitelist]);
      })
  }

  getPeerUpdateListener() {
    return this.whitelistUpdated.asObservable();
  }

  addWhitelist(data: any) {
    return this.http.post(this.api_path + '/ipWhitelist', data);
  }

  editPeer(data: any) {
    return this.http.put(this.api_path + '/ipWhitelist', data);
  }

  deletePeer(ipAddress: string) {
    return this.http.delete(`${this.api_path}/ipWhitelist'/${ipAddress}`);
  }

}
