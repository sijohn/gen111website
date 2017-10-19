import { Settings } from './../../settings';
import { AuthService } from './../../shared/services/auth.service';
import { MdSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shopnx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cards: Array<any>;
  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.cards = Settings.menu;
  }
}
