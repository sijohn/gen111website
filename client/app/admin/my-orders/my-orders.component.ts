import { ActivatedRoute } from '@angular/router';
import { ModalService } from './../../modal/modal.service';
import { AuthService } from './../../shared/services/auth.service';
import { Settings } from './../../settings';
import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { CrudService } from './../../shared/services/crud.service';
import { Subscription } from 'rxjs';
import BaseCtrl from './../../base';

@Component({
  selector: 'shopnx-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent extends BaseCtrl implements OnInit {
  orders: Array<any>;
  orderTypes: any[];
  Settings: any;
  message: string;
  busy: Subscription;
  meta: any = {};
  sort: { predicate: string, reverse: boolean };
  data: any[] = [];
  api: string = 'orders/my';
  id: string;
  msg: string;
  constructor(public crud: CrudService, public snack: MdSnackBar, private route: ActivatedRoute, private auth: AuthService, public modal: ModalService) {
    super();
    this.msg = this.route.snapshot.queryParams['msg'];
    this.id = this.route.snapshot.queryParams['id'];
  }

  ngOnInit() {
    this.Settings = Settings;
    this.flush(); // Important
    this.getData();
  }

  search(event: any) {

  }
  cancellable(status) {
    let orderStatus = Settings.orderStatus;
    let i = orderStatus.indexOf(status);
    return (i < 4);
  }
  cancelOrder(order) {
    if (!this.auth.loggedIn) {
      this.modal.login().subscribe();
      return;
    }

    this.modal.cancelOrder()
      .subscribe((data: any) => {
        if (!data) {
          this.message = 'Please tell us why you want to cancel the order'; return;
        }
        order.status = 'Cancellation Requested';
        order.comment = data.comment;
        this.crud.patch('orders', order._id, order).subscribe(data => {
          this.getData({ sort: '-updated_at' });
          this.snack.open('Order Cancellation Request Successful', 'OK', { duration: 2000 });
        }, err => { this.snack.open(err, 'OK', { duration: 2000 }); });
      });
  }
}
