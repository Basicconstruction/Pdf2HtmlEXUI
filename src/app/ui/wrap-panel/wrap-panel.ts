import {Component, Input} from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';

@Component({
  selector: 'app-wrap-panel',
  imports: [
    NgClass,
    NgStyle
  ],
  templateUrl: './wrap-panel.html',
  styleUrl: './wrap-panel.css'
})
export class WrapPanel {
  @Input() direction: 'column' | 'row' = 'column';
  @Input() spacing: number = 0;
  @Input() keepSize: boolean = true;
}
