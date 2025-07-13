import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzWaveDirective} from 'ng-zorro-antd/core/wave';
import {PdfService} from '../../services/pdf.service';
import {UploadResult} from '../../models/result';
import {LayoutService} from '../../services/layout.service';
import {Message} from '../../models';

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
  message: EventEmitter<Message> = new EventEmitter();
  constructor(private snackBar: MatSnackBar,private pdfService: PdfService, private layoutService: LayoutService) {

  }
  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024,
      sizes = ['Bytes', 'KB', 'MB', 'GB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  // guid: string | undefined;
  result: UploadResult | undefined;
  executeCommand() {
    if(this.flag==="上传"){
      const file = this.file;
      if (!file) return;
      this.flag = "上传中...";
      this.pdfService.uploadPdf(file)
        .then((result) => {
          this.result = result;
          this.snackBar.open(`${file.name} 上传成功！`, '关闭', { duration: 3000 });
          this.pdf2Html(result);
        })
        .catch((err) => {
          this.snackBar.open(`${file.name} 上传失败！${err}`, '关闭', { duration: 3000 });
        })
        .finally(() => {
          this.flag = "上传完成,执行中...";
        });
    }else if(this.flag==="下载"){
      let pdfName = this.result?.originalName;
      let pdfNameNoExtension = pdfName?.substring(0,pdfName?.lastIndexOf("."));
      window.open(`/api/download/html/${this.result?.fileName}?fileName=${pdfNameNoExtension}.html`, '_blank');
    }else if(this.flag==="再次执行"){
      this.pdf2Html(this.result!)
    }
  }
  pdf2Html(result: UploadResult){
    this.pdfService.executeTransfer(result).subscribe({
      next: (msg) => {
        this.message.emit({
          type: 0,
          msg: msg,
        })
      },
      complete: () => {
        this.snackBar.open(`${this.file!.name} 转化成功！`, '关闭', { duration: 3000 });
        this.flag = "下载";
      },
      error: (err) => {
        this.flag = "再次执行"
        this.snackBar.open(`执行失败！${err}`, '关闭', { duration: 3000 });
      }
    })
  }
  async executeCSV(){
    let layouts = await this.layoutService.getLayout(this.result?.fileName ?? "");
    this.message.emit({
      type: -1,
      msg: JSON.stringify(layouts),
    })
  }
  downloadLayout() {
    let pdfName = this.result?.originalName;
    let pdfNameNoExtension = pdfName?.substring(0,pdfName?.lastIndexOf("."));
    window.open(`/api/download/csv/${this.result?.fileName}?fileName=${pdfNameNoExtension}.csv`, '_blank');
  }
}
