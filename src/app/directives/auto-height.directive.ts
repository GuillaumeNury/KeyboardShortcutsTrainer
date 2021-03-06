import { AfterContentChecked, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: 'textarea[appAutoHeight]'
})
export class AutoHeightDirective implements AfterContentChecked {

	@HostListener('input', ['$event.target'])
	public onInput(textArea: HTMLTextAreaElement): void {
		this.adjust();
	}
	public constructor(public element: ElementRef) {
	}
	public ngAfterContentChecked(): void {
		this.adjust();
	}
	public adjust(): void {
		this.element.nativeElement.style.overflow = 'hidden';
		this.element.nativeElement.style.height = 'auto';
		this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + "px";
	}
}
