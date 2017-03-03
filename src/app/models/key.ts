export enum KeyboardKeys {
	END = 35,
	HOME = 36,
	LEFT_ARROW = 37,
	UP_ARROW = 38,
	RIGHT_ARROW = 39,
	DOWN_ARROW = 40
}

export enum DeletionKeyboardKeys {
	BACKSPACE = 8,
	DELETE = 46
}

export const KeyboardLabels = {};
KeyboardLabels[DeletionKeyboardKeys.BACKSPACE] = 'DEL';
KeyboardLabels[KeyboardKeys.END] = 'Fin';
KeyboardLabels[KeyboardKeys.HOME] = '\u2196';
KeyboardLabels[KeyboardKeys.LEFT_ARROW] = '←';
KeyboardLabels[KeyboardKeys.RIGHT_ARROW] = '→';
KeyboardLabels[DeletionKeyboardKeys.DELETE] = 'Suppr';

export class Key {
	public name: string;

	public constructor($event: KeyboardEvent) {
		this.initName($event);
	}

	private initName($event: KeyboardEvent): void {
		let name = '';

		if ($event.ctrlKey) {
			name += 'Ctrl + ';
		}
		if ($event.shiftKey) {
			name += 'Shift + ';
		}

		name += KeyboardLabels[$event.keyCode] || $event.code;

		this.name = name;
	}
}
