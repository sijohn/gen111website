import {
  Component,
  Input,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'shopnx-owl-carousel',
  templateUrl: 'owl-carousel.component.html',
  styleUrls: ['owl-carousel.component.css']
})

export class ShopnxCarouselComponent {
  @Input() options: Object;

  private $carouselElement: any;

  private defaultOptions: Object = {};

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    // for (let key in this.options) {
    //   if (this.options.hasOwnProperty(key)) {
    //     this.defaultOptions[key] = this.options[key];
    //   }
    // }
    let outerHtmlElement: any = $(this.el.nativeElement);
    this.$carouselElement = outerHtmlElement.find('.owl-carousel').owlCarousel(this.defaultOptions);
  }

  ngOnDestroy() {
    this.$carouselElement.trigger('destroy.owl.carousel');
    this.$carouselElement = null;
  }
}