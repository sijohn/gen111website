import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { CrudService } from './../../shared/services/crud.service';
import { feature } from './feature.fields';

@Component({
  selector: 'shopnx-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {
  fields: Array<any>;
  constructor() { this.fields = feature.fields; }
}
