import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ErrorMessageService } from "src/app/services/error-message.service";

@Component({
  selector: "app-error-message",
  templateUrl: "./error-message.component.html",
  styleUrls: ["./error-message.component.scss"],
})
export class ErrorMessageComponent implements OnInit {
  error$: Observable<string[]>;

  showError = false;
  constructor(private errMsgService: ErrorMessageService) {}

  ngOnInit(): void {
    this.error$ = this.errMsgService.errors$.pipe(
      tap((msg) => {
        if (msg[0] === "clear") return (this.showError = false); //remove error indicator
        return (this.showError = true);
      })
    );
  }

  onClose() {
    this.showError = false;
  }
}
