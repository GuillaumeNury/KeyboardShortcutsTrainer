import { KeyboardShortcutsTrainerPage } from './app.po';

describe('keyboard-shortcuts-trainer App', () => {
  let page: KeyboardShortcutsTrainerPage;

  beforeEach(() => {
    page = new KeyboardShortcutsTrainerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
