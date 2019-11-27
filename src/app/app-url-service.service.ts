import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppUrlServiceService {

  constructor() { }


  geturlfunction(param) {
    let obj: any =
    {
      BAY_EQUIP_LIST: environment.baseUrl + 'getMaster',
      INSIGHTS:   environment.baseUrl + 'getInsights'
    }
    return obj[param];
  }
}
