import { Component, OnInit , ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { BgpPeeringService } from '../../../services/bgp-peering.service';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

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
    }
}
