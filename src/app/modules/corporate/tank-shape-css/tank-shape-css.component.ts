import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { TankAssetService } from "src/app/data-access/http/tank-asset.service";
type Shape = "Rectangle" | "Circle" | "Cylinder";

@Component({
  selector: "app-tank-shape-css",
  templateUrl: "./tank-shape-css.component.html",
  styleUrls: ["./tank-shape-css.component.scss"],
})
export class TankShapeCssComponent implements OnInit {
  @ViewChild("cylinderLevel", { static: false }) cylinder: ElementRef;
  @ViewChild("rectangleLevel", { static: false }) rectangle: ElementRef;
  @ViewChild("circleLevel", { static: false }) circle: ElementRef;

  @Input() level: number = 500;
  @Input() maxSize: number = 1000;
  @Input() deviceIndex: number;
  @Input() title: string;
  @Input() shape: Shape = "Circle";
  @Input() tankId: string;
  @Input() color: string;

  @Output() minimizeTank = new EventEmitter<number>();
  @Output() maximizeTank = new EventEmitter<number>();
  @Output() tankDetails = new EventEmitter<number>();

  scales: number[] = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private tankAsset: TankAssetService
  ) {}

  ngOnInit(): void {
    this.animateLevel();
    this.caliberate();
    this.tankAsset.updateTankLevelAnimation(this.tankId).subscribe((data) => {
      this.level = data;
    });
  }

  animateLevel() {
    this.changeDetectorRef.detectChanges();
    const rand = Math.random() * 1000;
    const shapeRatio = 300 / this.maxSize;
    const shapeHeight = this.maxSize * shapeRatio;
    const contentLevel = this.level * shapeRatio;
    if (this.shape === "Cylinder")
      this.cylinder.nativeElement.style.cssText = `height: ${
        contentLevel + 8
      }px;`;
    if (this.shape === "Rectangle")
      this.rectangle.nativeElement.style.cssText = `height: ${
        contentLevel + 5
      }px;`;
    if (this.shape === "Circle") {
      this.circle.nativeElement.style.cssText = `height: ${
        contentLevel + 5
      }px;`;
         this.circle.nativeElement.style = `background-color: ${this.color}`;
          }

    window.requestAnimationFrame(this.animateLevel.bind(this));
  }

  caliberate() {
    for (let i = 0; i <= this.maxSize; i += this.maxSize / 4) {
      this.scales.unshift(i);
    }
  }

  minimize() {
    this.minimizeTank.emit(this.deviceIndex);
  }

  maximize() {
    this.maximizeTank.emit(this.deviceIndex);
  }

  dataDetails() {
    this.tankDetails.emit(this.deviceIndex);
  }
}
