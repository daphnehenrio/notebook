import data from './data';

const { buttons } = data;

import { Editor } from 'tinymce';

const addButton = (
  editor: Editor,
  buttonName: string,
  buttonText: string,
  buttonTooltip: string | undefined,
  buttonOnAction: Function,
): void => {
  editor.ui.registry.addButton(buttonName, {
    text: buttonText,
    tooltip: buttonTooltip,
    onAction: () => buttonOnAction(editor),
  });
};

const addShortcut = (
  editor: Editor,
  buttonShortcut: string,
  buttonText: string,
  buttonOnAction: Function,
): void => {
  editor.addShortcut(buttonShortcut, buttonText, () => {
    buttonOnAction(editor);
  });
};

export default (editor: Editor) => {
  buttons.forEach((button) => {
    const {
      name, text, tooltip, shortcut, onAction,
    } = button;
    if (shortcut) {
      addShortcut(editor, shortcut, text, onAction);
    }
    addButton(editor, name, text, tooltip, onAction);
  });
};
