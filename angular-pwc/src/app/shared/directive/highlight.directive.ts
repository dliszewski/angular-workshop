import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @HostBinding('style.text-decoration')
  decoration = '';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseover')
  onmouseover() {
    console.log('over');
    this.decoration = 'underline';

    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'yellow');
  }

  @HostListener('mouseout')
  onmouseout() {
    console.log('out');
    this.decoration = '';
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '');
  }

}
