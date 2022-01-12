// ? Import NPM
import { Editor } from 'tinymce';

// ? Import Local
import actions from './actions';

// ? Export
export default {
  buttons: [
    {
      name: 'kanjiButton',
      text: '漢字',
      tooltip: 'Kanji',
      shortcut: undefined,
      onAction: (editor: Editor): void => actions.addTagAndClassOnSelection(editor, 'span', 'kanji'),
    },
    {
      name: 'furiganaButton',
      text: 'ふりがな',
      tooltip: 'Furigana',
      shortcut: undefined,
      onAction: (editor: Editor): void => actions.addTagAndClassOnSelection(editor, 'span', 'furigana'),
    },
  ],
};
