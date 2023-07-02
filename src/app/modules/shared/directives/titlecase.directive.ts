import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
@Directive({
  selector: '[appTitleCase]'
})
export class TitlecaseDirective {
  @Input() mode!: "ONLY_FIRST" | "EACH_WORD"
  constructor(
    public ngControl: NgControl,
    public titleCase: TitleCasePipe
  ) { }

  private onlyFirst = (value :string)=>{
    let CaseStr = value[0].toUpperCase() + value.substr(1)
    this.ngControl.valueAccessor?.writeValue(CaseStr)
  }
  
  private eachWord = (value :string)=>{
    let titleCaseStr = "";
    let capitalizedWord = "";
    let capitalizedWords: string[] =  [];
    if(value != " "){
      if (value.indexOf(" ") > 0)
      {
        value.split(" ").map(word => {
          if(word != ""){
            capitalizedWord = word[0].toUpperCase() + word.substr(1).toLowerCase();
          }
          else{
            capitalizedWord = word;
          }
          capitalizedWords.push(capitalizedWord);
        });
        titleCaseStr = capitalizedWords.join(" ");
      }
      else{
        if(value.substr(1).length > 0){
          titleCaseStr = value[0].toUpperCase() + value.substr(1).toLowerCase();
        }
        else{
          titleCaseStr = value[0].toUpperCase() + value.substr(1);
        }
      }
    }
    //El capitalizador de angular no funciona correctamente en algunos casos, por eso se cambió por uno custom en esta instancia.
    // let titleCaseStr = this.titleCase.transform(value)
    this.ngControl.valueAccessor?.writeValue(titleCaseStr)
  }
  ngOnInit() {}

  @HostListener('ngModelChange', ['$event'])
  onInputChange(value: any) {
    if (value && value !== '' && value.length > 0) {
      let fn :Function = (this.mode == "EACH_WORD")? this.eachWord : this.onlyFirst
      fn(value)
    }
  }
}