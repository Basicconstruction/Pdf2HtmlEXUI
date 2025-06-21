import { Component } from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarContainer} from '@angular/material/snack-bar';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {WrapPanel} from '../ui';
import {PdfComponent} from './pdf/pdf.component';
import {PdfService} from '../services/pdf.service';
import {HttpClient} from '@angular/common/http';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-pdf2htmlex',
  imports: [
    NzCardModule,
    MatSnackBarContainer,
    NzButtonModule,
    WrapPanel,
    PdfComponent,
    NzInputDirective,
    FormsModule,
  ],
  providers: [
    {
      provide: MatSnackBarConfig, useValue: new MatSnackBarConfig (),
    },
    {
      provide: HttpClient,useClass: HttpClient,
    }
  ],
  templateUrl: './pdf2htmlex.component.html',
  styleUrl: './pdf2htmlex.component.css'
})
export class Pdf2htmlexComponent {
  pdfFiles: File[] = [];
  messageBox: string = "";

  constructor(private snackBar: MatSnackBar,
              public pdfService: PdfService,) {}

  triggerFileSelect() {
    const input = document.getElementById('fileInput') as HTMLInputElement;
    input.click();
  }
  clearAll(){
    this.pdfFiles.length = 0;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    // 过滤只保留pdf文件
    const filesArray = Array.from(input.files).filter((file) =>
      file.type === 'application/pdf'
    );

    if (filesArray.length !== input.files.length) {
      this.snackBar.open('只允许选择 PDF 文件', '关闭', { duration: 3000 });
    }

    this.pdfFiles = filesArray;
  }


  display($event: string) {
    this.messageBox = this.messageBox + $event;
  }
}
