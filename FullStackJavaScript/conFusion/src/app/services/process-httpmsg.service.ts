import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

  constructor() { }

  /**
   * handleError
   */
  public handleError(error: HttpErrorResponse | any) {
    let errMsg: String;

    if(error.error instanceof ErrorEvent){
      errMsg= error.error.message;
    }else{
      errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
    }
    
    return throwError(errMsg);
  }
}
