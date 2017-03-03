import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DeletionKeyboardKeys, KeyboardKeys } from '../models/key';

import { TrainingState } from '../models/trainingState';

@Component({
	selector: 'app-text-editor',
	templateUrl: './text-editor.component.html',
	styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {
	@ViewChild('textarea') private textarea: ElementRef;
	@Input() public canDelete: boolean;

	public state: TrainingState;

	constructor() {
		this.state = new TrainingState(
			[
				'Une super ligne 0000',
				'Une super ligne 0001',
				'Une super ligne 0002',
				'Une super ligne 0003',
				'Une super ligne 0004',
				'Une super ligne 0005',
				'Une super ligne 0006',
				'Une super ligne 0007',
				'Une super ligne 0008',
				'Une super ligne 0009',
				'Une super ligne 0010'
			].join('\n')
		);
	}

	ngOnInit() {
		this.updateState();
	}

	public getLines(): string[] {
		return !!this.state.textContent ? this.state.textContent.split('\n') : [];
	}

	public getCarretPosition2D(): number[] {
		const carretPosition = this.state.carretPosition;
		const lines = this.getLines();

		let l = 0;
		let ERROR_GUARD = 0;
		let currentPosition = 0;

		while (ERROR_GUARD < 1000 && l < lines.length && currentPosition < carretPosition) {
			if (currentPosition + lines[l].length + 1 <= carretPosition) {
				currentPosition += lines[l].length + 1;
				l++;
			}

			ERROR_GUARD++;
		}

		return [l, carretPosition - currentPosition];
	}

	public setCarretPosition2D(rowNumber: number, colNumber: number): void {
		const lines = this.getLines();
		let accumulator = 0;

		for (let i = 0; i < rowNumber; i++) {
			accumulator += lines[i].length;
		}

		// Add number of \n
		accumulator += rowNumber;

		console.log(this.state.carretPosition + ' -> ' + (accumulator + colNumber));

		this.setCarretPosition(accumulator + colNumber);
	}

	public moveLineUp(): void {
		const [row, col] = this.getCarretPosition2D();

		if (row <= 0) { return; }

		let lines = this.getLines();

		lines = [
			...lines.slice(0, Math.max(0, row - 1)),
			lines[row],
			lines[row - 1],
			...lines.slice(row + 1, lines.length )
		];

		this.state.textContent = lines.join('\n');

		setTimeout(() => this.moveCarretUp([row, col]));
	}

	public moveLineDown(): void {
		const [row, col] = this.getCarretPosition2D();

		let lines = this.getLines();

		if (row >= lines.length - 1) { return; }

		lines = [
			...lines.slice(0, row),
			lines[row + 1],
			lines[row],
			...lines.slice(row + 2, lines.length)
		];

		this.state.textContent = lines.join('\n');
		setTimeout(() => this.moveCarretDown([row, col]));
	}

	public copyLineUp(): void {
		const [row, col] = this.getCarretPosition2D();

		if (row <= 0) { return; }

		let lines = this.getLines();

		lines = [
			...lines.slice(0, Math.max(0, row)),
			lines[row],
			...lines.slice(row, lines.length )
		];

		this.state.textContent = lines.join('\n');

		setTimeout(() => this.setCarretPosition2D(row, col));
	}

	public copyLineDown(): void {
		const [row, col] = this.getCarretPosition2D();

		let lines = this.getLines();

		if (row >= lines.length - 1) { return; }

		lines = [
			...lines.slice(0, row),
			lines[row],
			...lines.slice(row, lines.length)
		];

		this.state.textContent = lines.join('\n');
		setTimeout(() => this.moveCarretDown([row, col]));
	}

	public moveCarretUp(position?: number[]): void {
		const [x, y] = position || this.getCarretPosition2D();
		this.setCarretPosition2D(Math.max(0, x - 1), y);
	}

	public moveCarretDown(position?: number[]): void {
		const [x, y] = position || this.getCarretPosition2D();
		const maxX = this.getLines().length - 1;
		this.setCarretPosition2D(Math.min(maxX, x + 1), y);
	}

	private setCarretPosition(position: number): void {
		console.log('setCarretPosition', position);
		this.textarea.nativeElement.selectionStart = position;
		this.textarea.nativeElement.selectionEnd  = position;
	}

	private getCarretPosition(): number {
		return this.textarea.nativeElement.selectionStart;
	}

	private onKeyDown($event: KeyboardEvent): void {
		if (
			$event.keyCode in KeyboardKeys
			|| (
				this.canDelete && $event.keyCode in DeletionKeyboardKeys
			)
		) {
			// Emit
			switch ($event.keyCode) {
				case KeyboardKeys.UP_ARROW:
					if ($event.altKey) {
						if ($event.shiftKey) {
							this.copyLineUp();
						} else {
							this.moveLineUp();
						}
					}
					break;
				case KeyboardKeys.DOWN_ARROW:
					if ($event.altKey) {
						if ($event.shiftKey) {
							this.copyLineDown();
						} else {
							this.moveLineDown();
						}
					}
					break;
			}
		} else {
			// this.abortEvent($event);
		}

		this.updateState();
	}

	private getCarretSelection(): number[] {
		return [this.textarea.nativeElement.selectionStart, this.textarea.nativeElement.selectionEnd];
	}

	private getTextContent(): string {
		return this.textarea.nativeElement.value;
	}

	private onClick($event: MouseEvent): boolean {
		this.abortEvent($event);

		this.textarea.nativeElement.focus();

		return false;
	}

	private abortEvent($event: Event): void {
		$event.preventDefault();
		$event.stopPropagation();
	}

	private updateState(): Promise<void> {
		return new Promise<void>(resolve => {
			setTimeout(
				() => {
					resolve();
					this.state.carretPosition = this.getCarretPosition();
					this.state.textContent = this.getTextContent();
					this.state.carretSelection = this.getCarretSelection();
				}
			);
		});
	}
}
