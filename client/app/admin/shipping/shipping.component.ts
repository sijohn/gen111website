import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { CrudService } from './../../shared/services/crud.service';
import { fields } from './shipping.fields';

@Component({
  selector: 'shopnx-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  shipping: Array<any>;
  fields: Array<any>;
  no: any;
  constructor(private crud: CrudService, private snack: MdSnackBar) {
    this.fields = fields.shipping;
    this.no = {};
  }

  ngOnInit() {
    this.crud.get('shippings', null, true).subscribe(this.success, this.err);
  }
  success(data) {
    this.shipping = data;
  }
  err(err) {
    this.snack.open(err, 'OK', { duration: 2000 });
  }
}
