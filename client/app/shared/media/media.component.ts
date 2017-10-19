import { SingleFileUploadModal } from './modal-single';
import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'media-library',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  selectedOption: string;

  constructor(public dialog: MdDialog) { }

  openDialog() {
    let dialogRef = this.dialog.open(SingleFileUploadModal);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  ngOnInit() {
  }

}


