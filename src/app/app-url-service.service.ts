import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppUrlServiceService {

  constructor() { }
  geturlfunction(param) {
    let obj: any = {
      BAY_MASTER: environment.baseurl + 'getMaster',
    }
    return obj[param];
  }
}
