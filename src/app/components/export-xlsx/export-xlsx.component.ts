import { Invester } from './../../classes/invester';
import { Poll } from './../../classes/poll';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { PollService } from './../../services/poll.service';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-export-xlsx',
  templateUrl: './export-xlsx.component.html',
  styleUrls: ['./export-xlsx.component.css']
})
export class ExportXlsxComponent implements OnInit {
  dataHCM = [];
  dataHN = [];
  constructor(private pollService: PollService) {}

  ngOnInit() {}

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data']
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });

    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  downloadHCM() {
    this.pollService.getTT().subscribe(tt => {
      if (tt.length > 0) {
        tt.forEach(ttPoll => {
          this.dataHCM.push(this.cast(ttPoll));
        });
      }
      this.pollService.getCB().subscribe(cb => {
        if (cb.length > 0) {
          cb.forEach(cbPoll => {
            this.dataHCM.push(this.cast(cbPoll));
          });
        }
        this.pollService.getMH().subscribe(mh => {
          if (mh.length > 0) {
            mh.forEach(mhPoll => {
              this.dataHCM.push(this.cast(mhPoll));
            });
          }
          console.log(this.dataHCM);
          this.exportAsExcelFile(this.dataHCM, 'Nha_dau_tu_HCM');
        });
      });
    });
  }

  downloadHN() {
    this.pollService.getTT_HN().subscribe(tt => {
      if (tt.length > 0) {
        tt.forEach(ttPoll => {
          this.dataHCM.push(this.cast(ttPoll));
        });
      }
      this.pollService.getCB_HN().subscribe(cb => {
        if (cb.length > 0) {
          cb.forEach(cbPoll => {
            this.dataHCM.push(this.cast(cbPoll));
          });
        }
        this.pollService.getMH_HN().subscribe(mh => {
          if (mh.length > 0) {
            mh.forEach(mhPoll => {
              this.dataHCM.push(this.cast(mhPoll));
            });
          }
          console.log(this.dataHCM);
          this.exportAsExcelFile(this.dataHCM, 'Nha_dau_tu_HN');
        });
      });
    });
  }

  cast(obj) {
    const invester = <Invester>{};
    invester['Họ và tên'] = obj.fullName;
    invester.Email = obj.email;
    invester['Số điện thoại'] = obj.phone;
    invester['Kiểu nhà đầu tư'] = obj.investion;
    invester['Dự đoán'] = obj.predict;
    invester['Thời gian'] = obj.hour + ':' + obj.minute;
    return invester;
  }
}
