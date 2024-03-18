import { Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { BgpPeeringService } from 'src/app/services/bgp-peering.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    selector: 'excel-upload-cmp',
    moduleId: module.id,
    templateUrl: 'excel-upload.component.html'
})

export class ExcelUploadComponent{

  constructor(private bgpService: BgpPeeringService, private router: Router) { }

  public files: Array<any>= [];
  public physicalFile: Array<any>= [];
  fileType: Array<String> = ['text/plain', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  data = {
    uploadedBy: 0, uploadedOn: '', remarks: ''
  }

  public dropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          console.log(file);

          if (this.files.length == 0) {
            if (this.fileType.includes(file.type)) {
              this.physicalFile.push(file);
              this.files.push({
                  filename: file.name,
                  filetype: file.type,
                  filesize: file.size
              });
            } else {
              Swal.fire({
                title: 'Unsupported file type!',
                text: 'Only .xlsx and .txt file is allowed',
                icon: 'error',
                showCloseButton: true,
                showConfirmButton: false
              })
            }
          } else {
            Swal.fire({
                title: 'Exceed Limit!',
                text: 'Please proceed with submission before uploading another file',
                icon: 'warning',
                showCloseButton: true,
                showConfirmButton: false
              })
          }


          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any){
    console.log(event);
  }

  public fileLeave(event: any){
    console.log(event);
  }

  public onRemove() {
    this.files.pop();
  }

  public onUpload() {
    this.data.uploadedBy = 1;
    this.data.uploadedOn = moment(new Date()).format('YYYY-MM-DD');
    this.addRemarks();
  }

  private addRemarks() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Please insert remarks!",
      icon: "warning",
      input: 'textarea',
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.data.remarks = result.value;
        this.submitFormData(this.data);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Submission is not proceed!",
          icon: "error"
        });
      }
    });
  }

  submitFormData(data: any) {
    let formdata = new FormData();
    let timerInterval;
    console.log(this.physicalFile[0]);

    formdata.append('data', JSON.stringify(data));
    formdata.append('attachment', this.physicalFile[0]);

    this.bgpService.uploadExcelIp(formdata)
      .subscribe((res: any) => {
        console.log(res);
        if (res.message == 'file uploaded successfully') {
          Swal.fire({
            icon: 'success',
            title: "Submitted",
            text: "File has been uploaded successfully!",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              // this.router.navigate(['/bgp-peering']);
              window.location.reload();
            }
          });
        } else if (res.message == 'Invalid ip address found! Please fix those ip addresses.') {
          Swal.fire({
            title: 'Invalid ip address found!',
            text: 'Please fix those ip addresses before submitting again',
            icon: 'error'
          });
        } else if (res.message == 'Duplicates IP Address found! Please fix those ip addresses.') {
          Swal.fire({
            title: 'Duplicates IP Address found',
            text: 'Please fix those ip addresses before submitting again',
            icon: 'error'
          });
        }

      })
  }
}
