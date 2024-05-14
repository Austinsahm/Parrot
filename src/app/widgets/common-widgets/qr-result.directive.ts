import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";

@Directive({
  selector: "[appQrResult]",
})
export class QrResultDirective implements OnDestroy {
  @Output() public appQrResult = new EventEmitter();

  private result: MutationObserver;

  constructor(private elementRef: ElementRef) {

    const el = elementRef.nativeElement;
    this.result = new MutationObserver((res) => {
      this.appQrResult.emit(res);
    });

    this.result.observe(el, { attributes: true });
  }

  ngOnDestroy(): void {
    this.result.disconnect();
  }
}
