import { Input } from '@angular/core';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: 'input[numbersOnly]'
})
export class NumberDirective {

    @Input() float: boolean = false;
    constructor(private _el: ElementRef) { }

    @HostListener('input', ['$event']) onkeydown(event) {
        let initalValue = this._el.nativeElement.value;
        
        //VALIDACION: SI EXISTE UN PUNTO Y SE INTENTA AGREGAR OTRO
        const count = initalValue.match(/[.]/g) || [];
        if(count.length > 1){
            let arrElem = initalValue.split("");
            let onlyDot = false;
            arrElem = arrElem.map(val => {
                if(onlyDot) {
                    if(val == ".") val = "";
                } else {
                    if(val == ".") onlyDot = true;
                }
                return val
            })
            initalValue = arrElem.join("");
        }

        //LIMPIAMOS EL INPUT DE CUALQUIER LETRA O SIMBOLO
        let regx = this.float ? /[^0-9,.]*/g : /[^0-9]*/g
        this._el.nativeElement.value = initalValue.replace(regx, '');
        if (initalValue !== this._el.nativeElement.value)
            return event.stopPropagation();

        //VALIDACION: EL NUMERO NO PUEDE EMPEZAR CON "." o "0"
        if (initalValue.indexOf(".") === 0 ||
            initalValue.indexOf("0") === 0 
        ) {
            this._el.nativeElement.value = initalValue.replace(/^[0,.]*/,'');
        }
    }
}