import { DialogsService } from './dialogs.service';
import { MdButtonModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { AcceptDialog } from './accept-dialog.component';
import { ConfirmDialog } from './confirm-dialog.component';

@NgModule({
    imports: [
        MdButtonModule,
    ],
    exports: [
        ConfirmDialog, AcceptDialog,
    ],
    declarations: [
        ConfirmDialog, AcceptDialog,
    ],
    providers: [
        DialogsService,
    ],
    entryComponents: [
        ConfirmDialog, AcceptDialog,
    ],
})
export class DialogsModule { }
