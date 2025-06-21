import {Directive, ElementRef, Input, Renderer2, OnInit, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[ScrollViewer]'
})
export class ScrollViewerDirective {
  @Input() scrollX: boolean = false;
  @Input() scrollY: boolean = true;

  @Input() width: string | undefined  = undefined;
  @Input() height: string | undefined = undefined;
  constructor(private el: ElementRef, private renderer: Renderer2) {

  }
  ngOnInit() {
    this.updateScroll(this.scrollX,this.scrollY)
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['scrollX'] || changes['scrollY']) {
      this.updateScroll(this.scrollX, this.scrollY);
    }
  }
  private updateScroll(scrollX: boolean, scrollY: boolean) {
    const nativeEl = this.el.nativeElement;
    this.renderer.setStyle(nativeEl, 'overflow-x', scrollX ? 'scroll' : 'hidden');
    this.renderer.setStyle(nativeEl, 'overflow-y', scrollY ? 'scroll' : 'hidden');

    this.renderer.setStyle(nativeEl, 'width', this.width);
    this.renderer.setStyle(nativeEl, 'height', this.height);
  }
}
