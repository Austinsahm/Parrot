import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { UserSessionInformation } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly $isLoggedIn: Observable<boolean> = this._isLoggedIn.asObservable();

  constructor() {
    const userInfo = localStorage.getItem('user_info') ;

    if (userInfo) {
      this._isLoggedIn.next(true);
    }
  }

  getUserInfo(): UserSessionInformation {
    const userInfo = localStorage.getItem('user_info') ;
    
    //return {companyId: 'abcltd'};
    if (userInfo) {
      try {
        return JSON.parse(userInfo);
      } catch (e) {
        return null;
      }
    }

    return null;
  }

  setUserInfo(userInfo: UserSessionInformation) {
    if (!userInfo) {
      return;
    }

    localStorage.setItem('user_info', JSON.stringify(userInfo || {}));

    this._isLoggedIn.next(true);
  }

  deleteUserInfo() {
    localStorage.removeItem('user_info');
    this._isLoggedIn.next(false);
  }

  isAuthenticated() {
    return this._isLoggedIn.value;
  }
}
