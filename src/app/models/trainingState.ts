export class TrainingState {
	public textContent: string;
	public carretPosition: number;
	public carretSelection: number[];

	public constructor(textContent: string = '', carretPosition: number = 0, carretSelection: number[] = [0, 0]) {
		this.carretPosition = carretPosition;
		this.carretSelection = carretSelection;
		this.textContent = textContent;
	}
}
