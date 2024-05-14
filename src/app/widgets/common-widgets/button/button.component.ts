import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

enum BtnType {
  primary = "primary",
  outline = "outline",
  delete = "delete",
  other = "other",
}

enum BtnSize {
  sm = "sm",
  md = "md",
  lg = "lg",
}

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent implements OnInit {
  @Input() text: string;
  @Input() styles: string;
  @Input() btnType: BtnType;
  @Input() btnSize:BtnSize

  @Output() action = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onClicked() {
    this.action.emit();
  }
}
