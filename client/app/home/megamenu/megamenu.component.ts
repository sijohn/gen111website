import { MdSnackBar } from '@angular/material';
import { CrudService } from './../../shared/services/crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'megamenu',
  templateUrl: './megamenu.component.html',
  styleUrls: ['./megamenu.component.css']
})
export class MegamenuComponent implements OnInit {
  categories: Array<any>;
  constructor(private crud: CrudService, private snack: MdSnackBar) { }

  ngOnInit() {
    this.crud.get('categories').subscribe(data => this.categories = data, err => this.handleErr);
  }
  handleErr(err: any) {
    this.snack.open('Categories could not be loaded', 'OK', { duration: 2000 });
  }
}
