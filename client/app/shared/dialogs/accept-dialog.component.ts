import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'accept-dialog',
    template: `
        <p>{{ title }}</p>
        <p>{{ message }}</p>
        <button type="button" md-raised-button 
            (click)="dialogRef.close('accept')" class="mat-raised circular-progress-button mat-primary">ACCEPT</button>
        <button type="button" md-raised-button 
            (click)="dialogRef.close('reject')">REJECT</button>
        <button type="button" md-button 
            (click)="dialogRef.close()">Cancel</button>
    `,
})
export class AcceptDialog {

    public title: string;
    public message: string;

    constructor(public dialogRef: MdDialogRef<AcceptDialog>) {

    }
}