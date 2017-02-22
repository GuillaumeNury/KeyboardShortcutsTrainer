import { TrainingState } from './trainingState';

export interface ITrainingObjective {
	isValidated: boolean;
	check(state: TrainingState): boolean;
	validate(state: TrainingState): boolean;
	getDisplayText(state: TrainingState): string;
	getObjectiveImage(state: TrainingState): string;
}

export abstract class ATrainingObjective implements ITrainingObjective {
	public isValidated: boolean;

	public abstract check(state: TrainingState): boolean;
	public abstract getDisplayText(state: TrainingState): string;
	public abstract getObjectiveImage(state: TrainingState): string;

	public constructor() {
		this.isValidated = false;
	}

	public validate(state: TrainingState): boolean {
		if (!this.isValidated && this.check(state)) {
			this.isValidated = true;
		}

		return this.isValidated;
	}
}

export class CarretPositionObjective extends ATrainingObjective {
	public carretPosition: number;

	public constructor(carretPosition: number) {
		super();
		this.carretPosition = carretPosition;
	}

	public check(state: TrainingState): boolean {
		return state.carretPosition === this.carretPosition;
	}

	public getDisplayText(state: TrainingState): string {
		return 'Mettre le chariot en position ' +  this.carretPosition
			+ ' (' + state.carretPosition + ' / ' + this.carretPosition + ').';
	}

	public getObjectiveImage(state: TrainingState): string {
		return '<p>'
			+ state.textContent.substr(0, this.carretPosition)
			+ '<span class="carret"></span>'
			+ state.textContent.substr(this.carretPosition)
			+ '</p>';
	}
}

export class CarretSelectionObjective extends ATrainingObjective {
	public carretSelection: number[];

	public constructor(carretSelection: number[]) {
		super();
		this.carretSelection = carretSelection;
	}

	public check(state: TrainingState): boolean {
		return state.carretSelection[0] === this.carretSelection[0]
			&& state.carretSelection[1] === this.carretSelection[1];
	}

	public getDisplayText(state: TrainingState): string {
		return 'Sélectionnez le texte en position ' +  this.carretSelection
			+ ' (' + this.getCarretPositionAsText(state.carretSelection) + ' / ' + this.getCarretPositionAsText(this.carretSelection) + ').';
	}

	public getObjectiveImage(state: TrainingState): string {
		const start = this.carretSelection[0];
		const end = this.carretSelection[1];

		return '<p>'
			+ state.textContent.substr(0, start)
			+ '<span class="selection">'
			+ state.textContent.substr(start, end - start)
			+ '</span>'
			+ state.textContent.substr(end)
			+ '</p>';
	}

	private getCarretPositionAsText(position: number[]): string {
		return '[' + position.join(', ') + ']';
	}
}

export class TextContentObjective extends ATrainingObjective {
	public textContent: string;

	public constructor(textContent: string) {
		super();
		this.textContent = textContent;
	}

	public check(state: TrainingState): boolean {
		return state.textContent === this.textContent;
	}

	public getDisplayText(state: TrainingState): string {
		return ' (' + this.getTextContentAsText(state.textContent) + ' / ' + this.getTextContentAsText(this.textContent) + ').';
	}

	public getObjectiveImage(state: TrainingState): string {
		return '<p>'
			+ this.textContent
			+ '</p>';
	}

	private getTextContentAsText(text: string): string {
		return '"' + text + '"';
	}
}
