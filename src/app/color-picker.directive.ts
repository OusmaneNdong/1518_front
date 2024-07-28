import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appColorPicker]'
})
export class ColorPickerDirective {

  @Output() colorChange = new EventEmitter<string>();


  @HostListener('input', ['$event.target.value']) onInput(value: string) {
    this.colorChange.emit(value);
  }

  constructor() { }

}
