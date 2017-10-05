import { MediaLibraryModal } from './../../../shared/media/media-library';
import { MdDialog } from '@angular/material';

import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shopnx-variants',
  templateUrl: './variants.component.html',
  styleUrls: ['./variants.component.css']
})
export class VariantsComponent implements OnInit {
  @Input('group')
  public variantsForm: FormGroup;
  constructor(private dialog: MdDialog) { }
  ngOnInit() {
  }
  err(err) {
    console.log(err);
  }

  chooseImage() {
    let dialogRef = this.dialog.open(MediaLibraryModal, {
      width: '80%',
      height: '80%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.variantsForm.get('image').setValue(result);
      }
    });
  }
}