import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.css']
})
export class SubmitButtonComponent implements OnInit {
  @Input() form: any;
  @Input() text: string;
  @Input() loading: boolean;
  @Input() disabled: boolean;
  @Input() icon: string = 'save';
  constructor() {
    // this.form = this.form.form;
    this.loading = !!this.loading;
    this.disabled = !!this.disabled;
  }

  ngOnInit() { }
}