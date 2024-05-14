import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "./services/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title: string;
  isLoading: boolean;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.title = "Savipro-Iot";

    // this.service.connectWebSocket();
  }

  ngOnInit(): void {

  }
}
