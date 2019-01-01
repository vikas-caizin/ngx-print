import { Directive, HostListener, Input } from '@angular/core';
@Directive({
  selector: 'button[ngxPrint]'
})

export class NgxPrintDirective {

  public _printStyle = [];

  /**
   *
   *
   * @memberof NgxPrintDirective
   */
  @Input() printSectionId: string;

  /**
   *
   *
   * @memberof NgxPrintDirective
   */
  @Input() printTitle: string;

  /**
   *
   *
   * @memberof NgxPrintDirective
   */
  @Input()
  set printStyle(values: {[key: string]: {[key: string]: string}}) {
    for (var key in values) {
      if (values.hasOwnProperty(key)) {
      this._printStyle.push((key + JSON.stringify(values[key])).replace(/['"]+/g, ''));
      }
    }
    this.returnStyleValues();
  }

  /**
   *
   *
   * @returns
   * @memberof NgxPrintDirective
   */
  public returnStyleValues() {
    return this._printStyle.join(' ');
  }

  /**
   *
   *
   * @memberof NgxPrintDirective
   */
  @HostListener('click', ['$event.target'])
  public print(): void {
    let printContents, popupWin;
    printContents = document.getElementById(this.printSectionId).innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>${this.printTitle ? this.printTitle : ''}</title>
          <style>
            ${this.returnStyleValues()}
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
 }
}
