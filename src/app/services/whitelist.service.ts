import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Whitelist } from '../model/whitelist.model';

@Injectable({
  providedIn: 'root'
})
export class WhitelistService {
  whitelist: Whitelist[]= [];
  whitelistUpdated = new Subject<Whitelist[]>();
  constructor(private http: HttpClient) { }

  api_path = 'http://localhost:3001/api/whitelist';

  getWhitelistedIP() {
    this.http.get(this.api_path + '/ipWhitelist')
      .subscribe((listData: any) => {
        this.whitelist = listData.data;
        this.whitelistUpdated.next([...this.whitelist]);
      })
  }

  getWhitelistUpdateListener() {
    return this.whitelistUpdated.asObservable();
  }

  addWhitelist(data: any) {
    return this.http.post(this.api_path + '/ipWhitelist', data);
  }

  deleteWhitelist(ipAddress: string) {
    return this.http.delete(`${this.api_path}/ipWhitelist/${ipAddress}`);
  }

}
