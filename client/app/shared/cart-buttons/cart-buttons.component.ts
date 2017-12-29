import { CartService } from './../../shared/services/cart.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cart-buttons',
  templateUrl: './cart-buttons.component.html',
  styleUrls: ['./cart-buttons.component.css']
})
export class CartButtonsComponent implements OnInit {

  constructor(protected cart: CartService) { }
  @Input() product: any;
  @Input() variant: any;
  ngOnInit() {
  }
  addItem(product: any, variant: any, i: number) {
    if (variant) {
      i = i || 1;
      this.cart.addItem({ sku: product._id, name: product.name, slug: product.slug, mrp: variant.mrp, price: variant.price, quantity: 1, image: variant.image, category: product.category, size: variant.size, weight: variant.weight, vid: variant._id }, i);
    }
  }
}
