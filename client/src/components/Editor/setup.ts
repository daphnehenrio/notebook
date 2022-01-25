// ? Import NPM
import { Editor } from 'tinymce';

// ? Import Local
import data from './data';

const { buttons } = data;

// ? Functions definition
/**
 * @description Add buttons to the editor
 * @param editor         Editor
 * @param buttonName     String   ➡️ Name of the button
 * @param buttonText     String   ➡️ Text displayed of the button
 * @param buttonTooltip  String   ➡️ Tooltip of the button
 * @param buttonOnAction Function ➡️ Function to execute when the button is clicked
 */
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

/**
 * @description Add shortcuts for buttons
 * @param editor         Editor
 * @param buttonShortcut String   ➡️ Key combination for shortcut
 * @param buttonText     String   ➡️ Text displayed of the button
 * @param buttonOnAction Function ➡️ Function to execute when the shortcut is pressed
 */
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

// ? Export
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
