import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzWaveDirective} from 'ng-zorro-antd/core/wave';
import {PdfService} from '../../services/pdf.service';

@Component({
  selector: 'app-pdf',
  imports: [
    NzButtonComponent,
    NzCardComponent,
    NzWaveDirective
  ],
  templateUrl: './pdf.component.html',
  styleUrl: './pdf.component.css'
})
export class PdfComponent {
  @Input()
  file: File | undefined;
  flag: string = "上传";
  @Output()
  message: EventEmitter<string> = new EventEmitter();
  constructor(private snackBar: MatSnackBar,private pdfService: PdfService) {

  }
  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024,
      sizes = ['Bytes', 'KB', 'MB', 'GB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  guid: string | undefined;
  executeCommand() {
    if(this.flag==="上传"){
      const file = this.file;
      if (!file) return;
      this.flag = "上传中...";
      // 模拟上传过程，实际请替换成你的上传服务调用
      this.pdfService.uploadPdf(file)
        .then((result) => {
          this.guid = result.fileName;
          this.snackBar.open(`${file.name} 上传成功！`, '关闭', { duration: 3000 });
          this.pdfService.executeTransfer(result).subscribe({
            next: (msg) => {
              this.message.emit(msg)
            },
            complete: () => {
              this.snackBar.open(`${file.name} 转化成功！`, '关闭', { duration: 3000 });
              this.flag = "下载";
            }
          })
        })
        .catch(() => {
          this.snackBar.open(`${file.name} 上传失败！`, '关闭', { duration: 3000 });
        })
        .finally(() => {
          this.flag = "上传";
        });
    }else if(this.flag==="下载"){
      window.open(`/api/pdf2html/html/download/${this.guid}`, '_blank');
    }
  }

}
