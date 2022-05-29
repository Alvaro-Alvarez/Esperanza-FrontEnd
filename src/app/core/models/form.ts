export class Control{
    subForm?: SubForm;
    name?: string;
    type?: 'FormControl' | 'FormArray';
    Validators?: any[];
    valueDefault?: any;
}
export class SubForm{
    name!: string;
    form!: Form;
}
export class Form{
    controls!: Control[];
}
