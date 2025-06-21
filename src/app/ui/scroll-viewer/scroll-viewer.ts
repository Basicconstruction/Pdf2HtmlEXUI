import {Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-scroll-viewer',
  imports: [],
  templateUrl: './scroll-viewer.html',
  styleUrl: './scroll-viewer.css'
})
export class ScrollViewer {
  @ViewChild('viewport') viewport!: ElementRef<HTMLDivElement>;

  @Input() width: string = "300px";
  @Input() height: string = "200px";
  @Input() scrollX: 'scroll' | 'hidden' | 'auto' | 'visible' = "scroll";
  @Input() scrollY: 'scroll' | 'hidden' | 'auto' | 'visible' = "scroll";
  ngAfterViewInit() {
    // 这里可以添加额外逻辑，比如监听内容尺寸变化，或者控制滚动行为
  }

  scrollTo(x: number, y: number) {
    this.viewport.nativeElement.scrollLeft = x;
    this.viewport.nativeElement.scrollTop = y;
  }
}
