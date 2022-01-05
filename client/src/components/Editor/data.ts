import actions from './actions';
import { Editor } from 'tinymce';

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
