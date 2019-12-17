import { Directive, ElementRef, HostListener, Input } from '@angular/core';


@Directive({
  selector: '[heroBorderCard]'
})
export class HeroBorderCardDirective {

  private initialColor: string = '#f5f5f5';
  private defaultColor: string = '#009688';
  
  
	private defaultHeight:number = 200;
	
	constructor(private el: ElementRef) {
		this.setBorder(this.initialColor);
		this.setHeight(this.defaultHeight);
	}

@Input('pkmnBorderCard') borderColor: string;//alias

@HostListener('mouseenter') onMouseEnter() {
    this.setBorder(this.borderColor || this.defaultColor);
   
}

@HostListener('mouseleave') onMouseLeave() {
    this.setBorder(this.initialColor);
}
	private setBorder(color: string) {
		let border = 'solid 4px ' + color;
		this.el.nativeElement.style.border = border;
	}

	private setHeight(height: number) {
		this.el.nativeElement.style.height = height + 'px';
	}
}