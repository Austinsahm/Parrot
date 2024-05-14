import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  SimpleChanges,
  ChangeDetectionStrategy,
} from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { StatusCode } from "src/app/data-access/models/http.model";
import {
  FloorPlanDevice,
  FloorPlanDeviceIcon,
  IconPosData,
  SensorAttributeInfo,
  SmartHomeDevices,
} from "src/app/data-access/models/smartHome.model";
import { FloorPlanService } from "src/app/services/floor-plan.service";

@Component({
  selector: "app-corporate-floor-plan",
  templateUrl: "./corporate-floor-plan.component.html",
  styleUrls: ["./corporate-floor-plan.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CorporateFloorPlanComponent implements OnInit {
  @ViewChild("floorPlan", { static: true }) floorPlan!: ElementRef;
  loadCount = 0;
  @Input() set device(val: FloorPlanDevice) {
    this.droppedDevice = val;
  }
  //accept floorId based on floor selection
  @Input() set floorId(val: string) {
    this.loadCount = this.loadCount + 1;
    this.floor = val;
    this.loadFloorAndIcons(val);
  }
  @Input() set devices(devs: SmartHomeDevices[]) {
    const modified = devs.map((el, i) => {
      let update = Object.assign({}, el);
      // update.expanded = false;
      // update.pos = this.testPosition[i]?.pos;
      // update.path = this.testPosition[i]?.path;
      // update.floorId = "92200166-54cf-4185-a33e-d53a81bbf2b3";

      return update;
    });
    this.floorDevices = devs;
  }
  @Input() design: boolean = false;
  @Output() selectedDevice = new EventEmitter<number>();
  @Output() removeDroppedDevice = new EventEmitter<any>();
  @Output() addDeviceToList = new EventEmitter<any>();

  floorPlanController: any;
  droppedDevice: FloorPlanDevice;
  floorIcons: FloorPlanDeviceIcon[] = [];
  infoWindowLength = [];
  floor: string;
  floorDevices: SmartHomeDevices[];
  editIcon: boolean = false;
  editingIconPos: boolean = false;
  dragEndPos: number[];
  designDevices: FloorPlanDevice[] = [];

  constructor(
    private floorService: FloorPlanService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {}

  loadFloorAndIcons(floorId: string) {
    this.floorService.getTempToken().subscribe(
      (res: any) => {
        this.floorService.loadFloorSdk().then((floorSdk) => {
          const floorEl = this.floorPlan.nativeElement;
          const floorPlanStartupSettings = {
            hideElements: ["roomStamp"],
            panZoom: false,
            planRotation: 0,
            roomStampSize: null,
            ui: {
              menu: false,
              scale: false,
              coordinates: false,
            },
            theme: {
              background: {
                color: "#f3f5f8",
                showGrid: false,
              },
              wallContours: false,
              elements: {
                roomstamp: { showArea: false },
                asset: { fill: [255, 255, 255] },
              },
            },
            units: {
              system: "metric",
              digits: 0,
              roomDimensions: "area",
            },
          };

          this.floorPlanController = new floorSdk.FloorPlanEngine(
            floorEl,
            floorPlanStartupSettings
          );

          // load floor plan
          this.floorPlanController
            .loadScene(floorId, {
              authorization: res.authorization,
            })
            .then(() => {
              //drop and click events
              if (this.design) {
                this.floorPlanController.on("drop", (evt: any) => {
                  this.onDrop(evt, this.floorPlanController);
                });
              }
              this.floorPlanController.on("click", (evt: any) =>
                this.onClick(evt, this.floorPlanController)
              );

              if (!this.design) {
                this.displayDeviceOnLoad(this.floorDevices);
                if (this.loadCount % 2 === 0)
                  this.displayDeviceOnLoad(this.floorDevices);
              } else this.loadDesignDevices();
            });
        });
      },
      () => {}
    );
  }

  onDrop(archilogicEvent: any, floorPlan: any) {
    const event = archilogicEvent.sourceEvent;
    event.preventDefault();
    // get co-ordinates of drop
    const planPos = floorPlan.getPlanPosition([event.offsetX, event.offsetY]);

    // const { spaces } = floorPlan.getResourcesFromPosition(planPos);
    // const roomId = spaces[0].id;

    const dropDevice = this.droppedDevice;
    if (!this.editingIconPos) {
      // if device was dropped from list
      this.displayDeviceOnDrag(dropDevice, planPos); // call drag function on dropped device
      //  split the element after dropped
      this.removeDroppedDevice.emit(dropDevice);
    } else this.dragEndPos = planPos; // set position of drag end
  }

  onClick(archilogicEvent: any, floorPlan: any) {
    // console.log("clicked");
    const event = archilogicEvent.sourceEvent;
  }

  createSvg(svgPath?: string, alertStatus?: string): SVGSVGElement {
    var splitPath = svgPath?.split("*");

    const iconSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const iconPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    iconSvg.setAttribute("height", "48");
    iconSvg.setAttribute("width", "48");
    iconSvg.classList.add("draggable");
    if (alertStatus === "Y") {
      iconPath.setAttribute("fill", "none");
      iconPath.setAttribute("stroke", "red");
      iconPath.setAttribute("class", "animate");
      if (splitPath.length > 1) iconPath.setAttribute("d", splitPath[1]);
      else iconPath.setAttribute("d", splitPath[0]);
    } else {
      iconPath.setAttribute("stroke", "blue");
      iconPath.setAttribute("d", splitPath[0]);
    }
    iconSvg.appendChild(iconPath);
    return iconSvg;
  }

  displayDeviceOnLoad(devices: SmartHomeDevices[]) {
    devices.forEach((device, i) => {
      var svg = this.createSvg(device.sensorIcon, device.notificationDue);
      svg.setAttribute("title", device.deviceId);

      const iconDiv = document.createElement("div");
      iconDiv.appendChild(svg);
      iconDiv.classList.add("draggable");
      iconDiv.setAttribute("draggable", "true");
      iconDiv.setAttribute("title", device.deviceName);
      if (device.position && device.floorId === this.floor) {
        if (device.position.lat && device.position.lng) {
          const c = this.floorPlanController.addHtmlMarker({
            el: iconDiv,
            pos: [+device.position.lat, +device.position.lng],
          });

          c.el.addEventListener("click", (evt: any) => {
            evt.target.classList.add("fp-icon_selected");
            setTimeout(() => {
              evt.target.classList.remove("fp-icon_selected");
            }, 10000);
          });

          if (!this.design) {
            const cont = this.floorPlan.nativeElement;
            cont.addEventListener("click", (evt: any) => {
              if (device.deviceId === evt.target.attributes.title?.value)
                this.displayDeviceDropDown(evt, i);
            });
          }
        }
      }
    });
  }

  loadDesignDevices() {
    this.floorService.getDesignDevices(this.floor).subscribe(
      (data) => {
        this.designDevices = data ? data : [];
        // console.log(this.designDevices);

        this.displayDesignDevices(this.designDevices);
      },
      () => {}
    );
  }

  displayDesignDevices(designDevices: FloorPlanDevice[]) {
    if (designDevices) {
      designDevices.forEach((device) => {
        // display only devices that have values for lat and lng
        if (!(device.lat == null && device.lng == null)) {
          const position = [+device.lat, +device.lng];
          var svg = this.createSvg(device.sensorIcon, "N");
          svg.setAttribute("title", device.deviceId);
          const iconDiv = document.createElement("div");
          iconDiv.appendChild(svg);
          iconDiv.classList.add("draggable");
          iconDiv.setAttribute("draggable", "true");
          iconDiv.setAttribute("title", device.deviceName);

          const c = this.floorPlanController.addHtmlMarker({
            el: iconDiv,
            pos: position,
          });

          // editing position of a loaded device
          c.el.addEventListener("dragstart", (evt: any) => {
            this.editingIconPos = true;
          });

          c.el.addEventListener("dragend", (evt: any) => {
            c.remove();
            if (evt.dataTransfer.dropEffect !== "none") {
              device.lat = this.dragEndPos[0].toString();
              device.lng = this.dragEndPos[1].toString();
              this.displayDeviceOnDrag(device, this.dragEndPos);
              this.droppedDevice = device;
            } else {
              this.changeDevicePos(device);
              this.addDeviceToList.emit(device);
            }
            this.editingIconPos = false;
          });

          // // removing device from floor (setting lat and lng to null)
          // c.el.addEventListener("click", (evt: any) => {
          //   if (evt.target.classList.contains("draggable")) {
          //     const devId = evt.target.attributes.title.value;
          //     this.designDevices.map((device) => {
          //       if (device.deviceId == devId) {
          //         device.lat = null;
          //         device.lng = null;
          //       }
          //     });
          //     c.remove();
          //   }
          // });
        }
      });
    }
  }

  displayDeviceOnDrag(dragDevice: FloorPlanDevice, dropPos: number[]) {
    if (!(dragDevice.lat || dragDevice.lng || dragDevice.floorId)) {
      // if device was not previously on floor
      dragDevice.lat = dropPos[0].toString();
      dragDevice.lng = dropPos[1].toString();
      dragDevice.floorId = this.floor;
    }
    var svg = this.createSvg(dragDevice.sensorIcon, "N");
    svg.setAttribute("title", dragDevice.deviceId);
    const iconDiv = document.createElement("div");
    iconDiv.appendChild(svg);
    iconDiv.classList.add("draggable");
    iconDiv.setAttribute("draggable", "true");
    iconDiv.setAttribute("title", dragDevice.deviceName);
    const c = this.floorPlanController.addHtmlMarker({
      el: iconDiv,
      pos: dropPos,
    });

    var isInFloor = false;
    if (this.designDevices) {
      var isInFloor =
        this.designDevices.find((device) => {
          return device.deviceId == dragDevice.deviceId;
        }) != undefined;
    }
    if (!isInFloor) {
      // add device to floor
      this.designDevices.push(dragDevice);
    } else {
      // edit lat and lng of device
      this.designDevices.map((device) => {
        if (device.deviceId == dragDevice.deviceId) {
          device.lat = dragDevice.lat;
          device.lng = dragDevice.lng;
        }
      });
    }

    // editing position of a dropped device
    c.el.addEventListener("dragstart", (evt: any) => {
      this.editingIconPos = true;
    });

    c.el.addEventListener("dragend", (evt: any) => {
      let index = this.designDevices.findIndex(
        (device) =>
          device.deviceId === evt.target.firstChild.getAttribute("title")
      );
      this.designDevices.splice(index, 1);
      c.remove();
      if (evt.dataTransfer.dropEffect !== "none") {
        this.displayDeviceOnDrag(dragDevice, this.dragEndPos); // recall function on every drag
      } else {
        this.changeDevicePos(dragDevice);
        this.addDeviceToList.emit(dragDevice);
      }
      this.editingIconPos = false;
    });

    // removing a dropped device from floor
    // c.el.addEventListener("click", (evt: any) => {
    //   if (evt.target.classList.contains("draggable")) {
    //     const devId = evt.target.attributes.title.value;
    //     this.designDevices.map((device) => {
    //       if (device.deviceId == devId) {
    //         device.lat = null;
    //         device.lng = null;
    //       }
    //     });
    //     c.remove();
    //   }
    // });
  }

  changeDevicePos(dev) {
    this.designDevices = this.designDevices.map((device) => {
      if (dev.deviceId === device.deviceId) {
        return {
          ...device,
          lat: null,
          lng: null,
        };
      }
      return device;
    });
  }

  displayDeviceDropDown(evt: any, i: number) {
    if (evt.target.classList.contains("draggable")) {
      this.selectedDevice.emit(i);
    }
  }

  submit() {
    this.designDevices.forEach((val) => delete val.deviceName);

    this.floorService.publishFloorDeviceChanges(this.designDevices).subscribe(
      (res: any) => {
        if (res.statusCode === StatusCode.OK)
          this.toastService.success(
            "Changes Published Successfully",
            "Floor Device Assignment"
          );
        else
          this.toastService.error(
            "Couldn't Publish Changes",
            "Floor Device Assignment"
          );
      },
      (error) => {}
    );
    this.loadFloorAndIcons(this.floor);
  }
}
