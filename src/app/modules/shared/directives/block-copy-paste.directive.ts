import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBlockCopyPaste]'
})
export class BlockCopyPasteDirective {
  constructor() { }

  @Input() blockCopyAndPaste?: boolean;

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    if (this.blockCopyAndPaste) e.preventDefault();
  }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    if (this.blockCopyAndPaste) e.preventDefault();
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    if (this.blockCopyAndPaste) e.preventDefault();
  }
   @HostListener('keydown', ['$event'])
    public onKeydownHandler(e: KeyboardEvent): void {
      if (this.blockCopyAndPaste){
        if(e.keyCode===13){
          alert("enter")
        }
      }
    }
}