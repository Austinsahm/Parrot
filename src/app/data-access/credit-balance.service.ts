import { Injectable } from "@angular/core";
import { Client } from "@stomp/stompjs";
import { BehaviorSubject } from "rxjs";
import SockJS from "sockjs-client/dist/sockjs";
import { environment } from "src/environments/environment";

interface ContentBody {
  body: {
    creditBalance: number;
  };
}

@Injectable({
  providedIn: "root",
})
export class CreditBalanceService {
  base = `${environment.apiServerEndpoint}/credit-balance`;
  private wb = `${environment.apiServerEndpoint}/ws/credit-balance/update-balance/companyId`;
  private balances = new BehaviorSubject<number>(0);

  balance$ = this.balances.asObservable();

  constructor() {}

  updateCreditBalance(companyId: string) {
    // console.log('credit')
    const client = new Client({
      // brokerURL: ``,
      connectHeaders: {
        companyId,
      },
      debug: function (str) {},
      webSocketFactory() {
        return new SockJS(
          `${environment.apiServerEndpoint}/credit-balance?companyId=${companyId}`
        );
      },
      onConnect: function () {
        client.subscribe(
          `/ws/credit-balance/update-balance/companyId/${companyId}`,
          (content: any) => {
            console.log(JSON.parse(content.body).content);
            this.balances.next(+content.body.creditBalance);
          },
          { companyId: companyId }
        );
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // console.log(typeof WebSocket)
    // Fallback code
    if (typeof WebSocket !== "function") {
      // For SockJS you need to set a factory that creates a new SockJS instance
      // to be used for each (re)connect
      // client.webSocketFactory = function () {
      //   // Note that the URL is different from the WebSocket URL
      //   return new WebSocket(SockJS('http://localhost:15674/stomp'));
      // };
      client.subscribe(
        `/ws/credit-balance/update-balance/companyId/${companyId}`,
        (content: any) => {
          const credit = JSON.parse(content.body);
          this.balances.next(+credit.creditBalance);
        },
        { companyId }
      );
    }

    client.onConnect = (frame) => {
      // "creditBalance":"4498.80"
      // console.log(frame)
      // Do something, all subscribes must be done is this callback
      // This is needed because this will be executed after a (re)connect
      client.subscribe(
        `/ws/credit-balance/update-balance/companyId/${companyId}`,
        (content: any) => {
          const credit = JSON.parse(content.body);
          this.balances.next(+credit.creditBalance);
        },
        { companyId }
      );
    };

    client.onStompError = function (frame) {
      // Will be invoked in case of error encountered at Broker
      // Bad login/passcode typically will cause an error
      // Complaint brokers will set `message` header with a brief message. Body may contain details.
      // Compliant brokers will terminate the connection after any error
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
    };

    client.activate();
  }

  // updateCreditBalance(companyId: string) {
  //   // const client = new Client();

  //   const ws = new SockJS(this.base);

  //   // client.webSocketFactory = () => {
  //   // console.log("web factory");

  //   //   return ws;
  //   // };

  //   // ws.send()
  //   // // client.begin("");

  //   const client = new Client({
  //     brokerURL: "", //can blank，because use SockJS
  //     // connectHeaders: {"Authorization":xxx},
  //     debug: function (str) {
  //       console.log(str, "string");
  //     },
  //     reconnectDelay: 5000,
  //     heartbeatIncoming: 4000,
  //     heartbeatOutgoing: 4000,

  //     webSocketFactory() {
  //       console.log("web factory");
  //       return new SockJS(`${environment.apiServerEndpoint}/credit-balance`);
  //     },
  //   });

  //   console.log(client.connected);

  //   if (!client.connected) return;

  //   console.log(client.connected);

  //   client.subscribe(
  //     `/ws/credit-balance/update-balance/companyId/${companyId}`,
  //     (balance) => {
  //       console.log(balance);
  //     }
  //   );
  // }
}
