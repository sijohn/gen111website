import { CancelOrderComponent } from './cancel-order.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginModalComponent } from './../account/login/login-modal.component';
import { AccountModule } from './../account/account.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReviewFormComponent } from './review-form.component';
import { ConfirmModal } from './confirm-modal.component';
import { ModalService } from './modal.service';
import { NgModule } from '@angular/core';
import { MdDialogModule, MdInputModule, MdIconModule, MdButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdDialogModule, MdInputModule, MdIconModule, MdButtonModule,
    ReactiveFormsModule, FlexLayoutModule,
    SharedModule
  ],
  exports: [
    ConfirmModal, ReviewFormComponent, CancelOrderComponent
  ],
  declarations: [
    ConfirmModal, ReviewFormComponent, CancelOrderComponent
  ],
  providers: [
    ModalService,
  ],
  entryComponents: [
    ConfirmModal, ReviewFormComponent, LoginModalComponent, CancelOrderComponent
  ],
})
export class ModalModule { }