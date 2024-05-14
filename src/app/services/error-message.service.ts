import { Injectable } from "@angular/core";
import {Event, NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ErrorMessageService {
  private errorMessage = new BehaviorSubject<string[]>([]);

  errors$ = this.errorMessage
    .asObservable()
    .pipe(filter((e) => e && e.length > 0));

  constructor(private router: Router) {
    this.router.events.subscribe((ev: Event) => {
      //if router chamges  
      if (ev instanceof NavigationEnd) {
        this.clearError();
      }
    });
  }

  /** set the error inicator */
  errorExist(...err: string[]) {    
    this.errorMessage.next(err);
  }

  /**clear the error indicator */
  clearError() {
    this.errorMessage.next(["clear"]);
  }
}
