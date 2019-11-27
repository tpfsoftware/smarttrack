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
      INSIGHTS:   environment.baseUrl + 'getInsights',
      BAY_EQUIP_UPDATE:environment.baseUrl + 'update',
    }
    console.log(param)
    return obj[param];
  }
}
