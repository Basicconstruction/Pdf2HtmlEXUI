import {Component, Input} from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';

@Component({
  selector: 'app-stack-panel',
  imports: [
    NgClass,
    NgStyle
  ],
  templateUrl: './stack-panel.html',
  styleUrl: './stack-panel.css'
})
export class StackPanel {
  @Input() direction: 'column' | 'row' = 'column';
  @Input() spacing: number = 0;
  @Input() keepSize: boolean = true;
}
