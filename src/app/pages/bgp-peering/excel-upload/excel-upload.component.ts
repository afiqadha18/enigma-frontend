import { Component, OnInit} from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import Swal from 'sweetalert2';

@Component({
    selector: 'excel-upload-cmp',
    moduleId: module.id,
    templateUrl: 'excel-upload.component.html'
})

export class ExcelUploadComponent{

  public files: Array<any>= [];
  fileType: Array<String> = ['text/plain', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

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

  onUpload() {
    console.log(this.files);

  }
}
