import { Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { DeletionKeyboardKeys, Key, KeyboardKeys } from '../models/key';
import { ITrainingObjective, TextContentObjective } from '../models/trainingObjectives';

import { TrainingState } from '../models/trainingState';

@Component({
	selector: 'app-training',
	templateUrl: './training.component.html',
	styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
	@Input() public initialState: TrainingState;
	@Input() public objective: ITrainingObjective;

	@HostBinding('class.success') public get isSuccess(): boolean {
		return this.objective.isValidated;
	};

	@ViewChild('textarea') private textarea: ElementRef;

	public keysStack: Key[];
	public state: TrainingState;
	public canDelete: boolean;

	constructor() {
		this.keysStack = [];
	}

	ngOnInit() {
		this.initFromInitialState();

		this.canDelete = this.objective instanceof TextContentObjective;
	}

	public reset(): void {
		this.initFromInitialState();
		this.keysStack = [];
	}

	public getKeysStackAsString(): string  {
		return !!this.keysStack.length ? this.keysStack.map(k => k.name).join(', ') : 'aucune';
	}

	private onKeyDown($event: KeyboardEvent): void {
		if (this.objective.isValidated) {
			return this.abortEvent($event);
		}

		if (
			$event.keyCode in KeyboardKeys
			|| (
				this.canDelete && $event.keyCode in DeletionKeyboardKeys
			)
		) {
			this.keysStack.push(new Key($event));
		} else {
			// this.abortEvent($event);
		}

		this.updateState();
	}

	private onClick($event: MouseEvent): boolean {
		this.abortEvent($event);

		this.textarea.nativeElement.focus();

		return false;
	}

	private setCarretPosition(position: number): void {
		this.textarea.nativeElement.selectionStart = position;
		this.textarea.nativeElement.selectionEnd  = position;
	}

	private getCarretPosition(): number {
		return this.textarea.nativeElement.selectionStart;
	}

	private getCarretSelection(): number[] {
		return [this.textarea.nativeElement.selectionStart, this.textarea.nativeElement.selectionEnd];
	}

	private getTextContent(): string {
		return this.textarea.nativeElement.value;
	}

	private updateState(): void {
		setTimeout(
			() => {
				this.state.carretPosition = this.getCarretPosition();
				this.state.textContent = this.getTextContent();
				this.state.carretSelection = this.getCarretSelection();

				this.objective.validate(this.state);


			}
		);
	}

	private initFromInitialState(): void {
		this.state = Object.assign(new TrainingState(), this.initialState);
		this.objective.isValidated = false;

		setTimeout(() => this.setCarretPosition(this.state.carretPosition));
	}

	private abortEvent($event: Event): void {
		$event.preventDefault();
		$event.stopPropagation();
	}
}
