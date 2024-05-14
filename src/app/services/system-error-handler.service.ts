import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";

@Injectable({
  providedIn: "root",
})
export class SystemErrorHandlerService implements ErrorHandler {
  private tray: HotToastService;

  constructor(private readonly injector: Injector) {}

  handleError(error: Error): void {
    if (!this.tray) {
      this.tray = this.injector.get(HotToastService);
    }

    //if internet error
    const chunkFailedMessage = "Loading chunk";
    if (error.message.includes(chunkFailedMessage)) {
      this.tray.error("No internet connection", { dismissible: true });
      // window.location.reload();
    } 
    else {
      this.tray.error(error.message, { dismissible: true });
    }
    console.log(error);
  }
}
