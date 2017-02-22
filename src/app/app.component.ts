import {
	CarretPositionObjective,
	CarretSelectionObjective,
	ITrainingObjective,
	TextContentObjective,
} from './models/trainingObjectives';

import { Component } from '@angular/core';
import { TrainingState } from './models/trainingState';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	public state: TrainingState;
	public objectives: ITrainingObjective[];

	public constructor() {
		this.state = new TrainingState('Ceci est un texte de test !');
		this.objectives = [];

		this.objectives.push(new CarretPositionObjective(10));
		this.objectives.push(new CarretSelectionObjective([2, 12]));
		this.objectives.push(new TextContentObjective('Ceci est une licorne de test !'));
	}
}
