import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'button[ngxPrint]'
})
export class NgxPrintDirective {

  @Input() printSectionId: string;

  @HostListener('click', ['$event.target'])
  public print(): void {
    let printContents, popupWin;
    printContents = document.getElementById(this.printSectionId).innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
 }
}
