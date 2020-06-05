import { Component, OnInit, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'astronet-button',
  templateUrl: './astronet-button.component.html',
  styleUrls: ['./astronet-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AstronetButtonComponent implements OnInit {

  constructor() { }

  @Input() text: string = '';
  @Input() class: string = '';
  @Input() disabled: boolean = false;
  @Input() imgAlt: string = '';
  @Input() imgUrl: string = '';
  @Input() disabledImgUrl: string = '';
  @Input() type: 'submit' | 'reset' | 'button' = 'button';
  @Output() onClick = new EventEmitter<any>();

  ngOnInit() {
  }

  public onClickButton(event) {
    this.onClick.emit(event);
  }
}
