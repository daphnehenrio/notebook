import data from './data';

const { buttons } = data;

const addButton = (
  editor,
  buttonName,
  buttonText,
  buttonTooltip,
  buttonShortcut,
  buttonOnAction,
) => {
  editor.ui.registry.addButton(buttonName, {
    text: buttonText,
    tooltip: buttonTooltip,
    shortcut: buttonShortcut,
    onAction: () => buttonOnAction(editor),
  });
};

const addShortcut = (editor, buttonShortcut, buttonText, buttonOnAction) => {
  editor.addShortcut(buttonShortcut, buttonText, () => {
    buttonOnAction(editor);
  });
};

export default (editor) => {
  buttons.forEach((button) => {
    const {
      name, text, tooltip, shortcut, onAction,
    } = button;
    if (shortcut) {
      addShortcut(editor, shortcut, text, onAction);
    }
    addButton(editor, name, text, tooltip, shortcut, onAction);
  });
};
