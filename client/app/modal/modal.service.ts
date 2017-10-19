import { AuthService } from './../shared/services/auth.service';
import { CancelOrderComponent } from './cancel-order.component';
import { LoginModalComponent } from './../account/login/login-modal.component';
import { Observable } from 'rxjs/Rx';
import { ConfirmModal } from './confirm-modal.component';
import { ReviewFormComponent } from './review-form.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {

    constructor(private dialog: MdDialog, private auth: AuthService) { }

    public confirm(title: string, message: string): Observable<boolean> {
        let dialogRef: MdDialogRef<ConfirmModal>;
        dialogRef = this.dialog.open(ConfirmModal);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        return dialogRef.afterClosed();
    }

    public review(): Observable<boolean> {
        let dialogRef: MdDialogRef<ReviewFormComponent>;
        dialogRef = this.dialog.open(ReviewFormComponent);
        return dialogRef.afterClosed();
    }

    public cancelOrder(): Observable<boolean> {
        let dialogRef: MdDialogRef<CancelOrderComponent>;
        dialogRef = this.dialog.open(CancelOrderComponent);
        return dialogRef.afterClosed();
    }

    public login(): Observable<boolean> {
        let dialogRef: MdDialogRef<LoginModalComponent>;
        dialogRef = this.dialog.open(LoginModalComponent);
        return dialogRef.afterClosed();
    }

    public logout() {
        this.auth.logout();
    }
}
