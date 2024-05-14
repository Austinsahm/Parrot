import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { TankAssetService } from "src/app/data-access/http/tank-asset.service";
import { Subscription } from "rxjs";

type Shape = "Rectangle" | "Circle" | "Cylinder";

@Component({
  selector: "app-corporate-tank-shape",
  templateUrl: "./corporate-tank-shape.component.html",
  styleUrls: ["./corporate-tank-shape.component.scss"],
})
export class CorporateTankShapeComponent implements OnInit {
  @ViewChild("canvas", { static: true })
  canvasRef: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  subscription: Subscription;

  @Input() shape: Shape = "Rectangle";
  @Input() level: number = 800;
  @Input() tankId: string;
  @Input() maxSize: number = 1000;
  @Input() title: string;
  @Input() tankNum = 2;

  @Input() deviceIndex: number;
  @Output() frontEndAnimate = new EventEmitter<any>();
  @Output() minimizeTank = new EventEmitter<number>();
  @Output() maximizeTank = new EventEmitter<number>();
  @Output() tankDetails = new EventEmitter<number>();

  constructor(private tankService: TankAssetService) {}

  ngOnInit(): void {
    this.tankService.updateTankLevel(this.tankId);
    this.ctx = this.canvasRef.nativeElement.getContext("2d");
    this.drawMetrics();
    window.requestAnimationFrame(this.drawShapes.bind(this));

    this.subscription = this.tankService.tankLevel$.subscribe((data) => {
      console.log(data);
      
      if (data.length === this.tankNum) {
        const tank = data.find((el) => el.device === this.tankId);
        this.level = tank.level!;
      }
    });
  }

  drawShapes() {
    const rand = Math.random() * 1000;
    if (this.shape === "Cylinder") {
      this.drawCylinder(this.ctx, 100, 25, 150, 300);
      this.ctx.fillStyle = "red";
      this.ctx.fill();
      this.drawCylinder(this.ctx, 100, 225, 150, 100);
      // this.drawHalfCylinder(this.ctx, 100, 25, 150, 300);
    }

    if (this.shape === "Circle") {
      this.calcCirContent(this.maxSize, this.level);
    }

    if (this.shape === "Rectangle") {
      this.calcRectContent(this.maxSize, this.level);
    }
    window.requestAnimationFrame(this.drawShapes.bind(this));
  }

  drawMetrics() {
    if (this.shape === "Rectangle") {
      this.ctx.fillStyle = "black";
      this.showMetrics(278, 10, 400, this.maxSize, "mm");
    }
    if (this.shape === "Circle") {
      this.ctx.fillStyle = "black";
      this.showMetrics(345, 50, 305, this.maxSize, "mm", true);
    }
  }

  drawCylinder(ctx, x, y, w, h) {
    let i,
      xPos,
      yPos,
      pi = Math.PI,
      twoPi = 2 * pi;

    ctx.beginPath();

    for (i = 0; i < twoPi; i += 0.001) {
      xPos = x + w / 2 - (w / 2) * Math.cos(i);
      yPos = y + h / 8 + (h / 8) * Math.sin(i);

      if (i === 0) {
        ctx.moveTo(xPos, yPos);
      } else {
        ctx.lineTo(xPos, yPos);
      }
    }
    ctx.moveTo(x, y + h / 8);
    ctx.lineTo(x, y + h - h / 8);

    for (i = 0; i < pi; i += 0.001) {
      xPos = x + w / 2 - (w / 2) * Math.cos(i);
      yPos = y + h - h / 8 + (h / 8) * Math.sin(i);

      if (i === 0) {
        ctx.moveTo(xPos, yPos);
      } else {
        ctx.lineTo(xPos, yPos);
      }
    }
    ctx.moveTo(x + w, y + h / 8);
    ctx.lineTo(x + w, y + h - h / 8);

    ctx.closePath();
    ctx.stroke();

    this.ctx.fillStyle = "black";
    this.showMetrics(335, y, h, 1000, "mm");
  }

  drawHalfCylinder(ctx, x, y, w, h) {
    let i,
      xPos,
      yPos,
      pi = Math.PI,
      twoPi = 2 * pi;

    // Draw the top half of the cylinder
    ctx.beginPath();
    for (i = 0; i < pi; i += 0.001) {
      xPos = x + w / 2 - (w / 2) * Math.cos(i);
      yPos = y + h / 2 + (h / 2) * Math.sin(i);

      if (i === 0) {
        ctx.moveTo(xPos, yPos);
      } else {
        ctx.lineTo(xPos, yPos);
      }
    }
    ctx.closePath();
    ctx.stroke();

    // Draw the bottom half of the cylinder
    ctx.beginPath();
    for (i = pi; i < twoPi; i += 0.001) {
      xPos = x + w / 2 - (w / 2) * Math.cos(i);
      yPos = y + h / 2 - (h / 2) * Math.sin(i);

      if (i === pi) {
        ctx.moveTo(xPos, yPos);
      } else {
        ctx.lineTo(xPos, yPos);
      }
    }
    ctx.closePath();
    ctx.stroke();

    // Fill the cylinder with black
    ctx.fillStyle = "black";
    ctx.fill();
  }

  calcCirContent(totalSize: number, content: number) {
    //convert ciecle to radius 150
    const circleInRadius = (150 / totalSize) * content;

    const contentLevel = (circleInRadius * 2 * Math.PI) / 150;
    // start filling from bottom
    const halfContent = (75 * 2 * Math.PI) / 150 / 2;
    const adjustRemAngle = contentLevel - Math.PI;
    const splitAngle = adjustRemAngle / 2;

    this.ctx.beginPath();
    this.ctx.fillStyle = "red";
    this.ctx.arc(190, 200, 150, 0, 2 * Math.PI, true);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.fillStyle = "#D3D3D3";
    this.ctx.arc(190, 200, 150, 0 - splitAngle, Math.PI + splitAngle, true);
    this.ctx.fill();
  }

  calcRectContent(totalSize: number, content: number) {
    const rectRatio = 400 / totalSize;
    const maxSize = rectRatio * totalSize;
    const maxContent = rectRatio * content;

    this.ctx.fillStyle = "red";
    this.ctx.fillRect(125, 10, 150, 400);
    this.ctx.fillStyle = "#D3D3D3";
    this.ctx.fillRect(125, 10, 150, 400 - (maxContent + 3));
  }

  showMetrics(
    xpos: number,
    ypos: number,
    shapeMax: number,
    containerHeig: number,
    label: string,
    isCircle = false
  ) {
    let step = 0;
    let containerStep = containerHeig;
    let unit = 0;
    if (isCircle) {
      while (step <= shapeMax) {
        if (step === 0) {
          this.ctx.fillText("- Full", xpos, ypos + 3);
        } else if (step === shapeMax) {
          this.ctx.fillText("- Empty", xpos, ypos + step);
        } else
          this.ctx.fillText(`- ${containerStep} ${label}`, xpos, ypos + step);

        containerStep -= containerHeig / 2;
        step += shapeMax / 2;
      }
    } else {
      while (step <= shapeMax) {
        if (step === 0) {
          this.ctx.fillText("- Full", xpos, ypos + 3);
        } else if (step === shapeMax) {
          this.ctx.fillText("- Empty", xpos, ypos + step);
        } else
          this.ctx.fillText(`- ${containerStep} ${label}`, xpos, ypos + step);

        containerStep -= containerHeig / 5;
        step += shapeMax / 5;
      }

      while (unit <= shapeMax) {
        if (unit !== 0) this.ctx.fillText("-", xpos, ypos + unit);
        unit += shapeMax / 25;
      }
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

  animation(evt) {
    this.frontEndAnimate.emit(evt);
  }
}
