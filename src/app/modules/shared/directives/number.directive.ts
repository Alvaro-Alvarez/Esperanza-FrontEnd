import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumber]'
})
export class NumberDirective {

  constructor(private el: ElementRef) { }

  @Input() OnlyNumbers!: boolean;

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent)
  {
    if (e.ctrlKey)
      return;
    if ((e.key >= '0' && e.key <= '9')
      || e.key === 'Tab'
      || e.key === 'Enter'
      || e.key === 'Home'
      || e.key === 'End'
      || e.key === 'Backspace'
      || e.key === 'Clear'
      || e.key === 'Copy'
      || e.key === 'CrSel'
      || e.key === 'Cut'
      || e.key === 'Delete'
      || e.key === 'EraseEof'
      || e.key === 'ExSel'
      || e.key === 'Insert'
      || e.key === 'Paste'
      || e.key === 'Undo'
      || e.key === 'Redo'
    )
      return;
    else e.preventDefault();
  }
}
