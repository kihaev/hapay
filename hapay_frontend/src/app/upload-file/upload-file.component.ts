import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { FileService } from '../services/file-service';
import { CreateFileDto } from '../shared/models';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  public fileUploadQueue: any
  constructor(private toastService: ToastrService,
    private fileSvc: FileService) { }

  public minDate: Date = new Date()
  public maxDate: Date = new Date(2021, 12, 30)
  public dateControl = new FormControl('')

  public file: File

  ngOnInit() {

  }

  public get fileSize() {
    if (this.file)
      return Math.floor(this.file.size / 1024)
  }

  public getFileSize(file: File): number {
    const fileSize = file.size / 1024;
    return fileSize;
  }

  public checkIsImageAnd5Mb(file: File): boolean {
    if (this.getFileSize(file) >= 102400) {
      let msg = "File size exceeded!\nMax file size 100 Mb!";
      this.toastService.error(msg, "Attention!");
      return false;
    }
    return true;
  }

  public async addFile(event: any) {
    let file = event.target.files[0];
    if (!file) {
      return;
    }
    if (!this.checkIsImageAnd5Mb(file)) {
      return;
    }
    this.file = file
  }

  public sendData(){
    let dto: CreateFileDto = {
      expirationDate: this.dateControl.value.toString(),
      file: this.file
    }
    this.fileSvc.createFile(dto)
  }
}
