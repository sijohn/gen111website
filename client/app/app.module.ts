import { CheckoutGuard } from './home/checkout/checkout.guarg';
import { AccountModule } from './account/account.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BusyModule } from 'angular2-busy';
import { ModalModule } from './modal/modal.module';
import { SharedModule } from './shared/shared.module';
import { WishButtonComponent } from './home/wish-button/wish-button.component';
import { ProductCardComponent } from './home/product-card/product-card.component';
import { ShopComponent } from './home/shop/shop.component';
import { MegamenuComponent } from './home/megamenu/megamenu.component';
import { SuccessComponent } from './home/success/success.component';
import { CheckoutComponent } from './home/checkout/checkout.component';
import { FeaturedProductsComponent } from './home/featured-products/featured-products.component';
import { ProductDetailComponent } from './home/product/product-detail.component';
import { ShopnxCarouselComponent } from './home/owl-carousel/owl-carousel.component';
import { NewsBannerComponent } from './home/news-banner/news-banner.component';
import { BannerComponent } from './home/banner/banner.component';
import { CartService } from './shared/services/cart.service';
import { CrudService } from './shared/services/crud.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { CrudHelper } from './shared/services/crud.helper';
import { PluralizePipe } from './shared/pipes/pluralize.pipe';
import { ApiService } from './shared/services/api.service';
import { NotFoundComponent } from './shared/404/404.component';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { OwlModule } from 'angular-owl-carousel';
import { NouisliderModule } from 'ng2-nouislider';
import { MomentModule } from 'angular2-moment';
import { UsersResolve } from './shared/services/users.resolve';
import { ProductResolve } from './admin/product/product.resolve';

import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HomePageComponent } from './home/home/home.component';
import { MdButtonModule, MdIconModule, MdInputModule, MdSnackBarModule, MdSidenavModule, MdToolbarModule, MdListModule, MdCardModule, MdProgressBarModule, MdRadioModule, MdButtonToggleModule, MdCheckboxModule } from '@angular/material';
import { Http, RequestOptions, HttpModule } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

// import 'owl.carousel';
import 'jquery';
import 'hammerjs';
import '../styles/styles.scss';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'id_token',
    tokenGetter: (() => localStorage.getItem('id_token')),
    globalHeaders: [{ 'Content-Type': 'application/json' }]
  }), http, options);
}

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomePageComponent,
    BannerComponent, NewsBannerComponent, ShopnxCarouselComponent, FeaturedProductsComponent, CheckoutComponent, ProductCardComponent, ShopComponent, ProductDetailComponent, MegamenuComponent, MegamenuComponent, SuccessComponent, WishButtonComponent,
    // XLargeDirective,
    NotFoundComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    SharedModule,
    ModalModule,
    MdButtonModule, MdCheckboxModule, MdIconModule, MdInputModule, MdSnackBarModule, MdSidenavModule, MdToolbarModule, MdListModule, MdCardModule, MdProgressBarModule, MdRadioModule,
    MdButtonToggleModule,
    BrowserAnimationsModule,
    BusyModule,
    FlexLayoutModule,
    InfiniteScrollModule,
    AccountModule,
    // OwlModule,
    NouisliderModule,
    MomentModule,
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules })
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
    ApiService, UserService, AuthService, PluralizePipe, AuthHttp, CrudHelper, CrudService, UsersResolve, CartService, ProductResolve, AuthGuard, CheckoutGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) { }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
