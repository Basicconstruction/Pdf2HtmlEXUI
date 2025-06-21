import {Directive, ElementRef, Input, Renderer2, OnInit, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[StackPanel]'
})
export class StackPanelDirective {
  @Input() direction: 'column' | 'row' = 'column';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['direction']) {
      this.updateDirection(this.direction);
    }
  }

  private updateDirection(direction: 'column' | 'row') {
    const nativeEl = this.el.nativeElement;
    this.renderer.setStyle(nativeEl, 'display', 'flex');
    this.renderer.setStyle(nativeEl, 'flex-direction', direction);
  }
}
