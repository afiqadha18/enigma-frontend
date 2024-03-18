import { Component, OnInit , ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { BgpPeeringService } from '../../../services/bgp-peering.service';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
    selector: 'ip-upload-cmp',
    moduleId: module.id,
    templateUrl: 'ip-upload.component.html'
})

export class IpUploadComponent implements OnInit{
  addForm!: FormGroup;

  constructor(private bgpService: BgpPeeringService, private fb: FormBuilder) { }

    ngOnInit() {
      this.addForm = this.fb.group({
        // data: this.fb.array([this.newData()])
        data: this.fb.array([this.newData()])
      })
    }

    data() : FormArray {
      return this.addForm.get('data') as FormArray;
    }

    newData() : FormGroup {
      return this.fb.group({
        ipAddress: ['', Validators.required],
        duration: ['', Validators.required],
        remarks: ['']
      });
    }

    addNewData() {
      this.data().push(this.newData());
    }

    removeData(dataIndex: number) {
      console.log(dataIndex);
      this.data().removeAt(dataIndex);
    }

    onReset() {
      console.log(this.addForm.value);
      this.addForm.reset();
    }

    onSubmit() {
      console.log(this.addForm.value);
      this.bgpService.addIpAddress(this.addForm.value)
        .subscribe((res: any) => {
          console.log(res.message);
          if (res.message == 'Invalid ip address found! Please fix those ip addresses.') {
            Swal.fire({
              icon: "error",
              title: "Invalid IP Address!",
              text: "Please fix those IP Addresses before try submitting again",
              showConfirmButton: false,
              showCloseButton: true
            });
          } else {
            Swal.fire({
              icon: "success",
              title: res.message,
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
    }
}
