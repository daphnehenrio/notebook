import actions from './actions';

export default {
  buttons: [
    {
      name: 'kanjiButton',
      text: '漢字',
      tooltip: 'Kanji',
      shortcut: null,
      onAction: (editor) => actions.addTagAndClassOnSelection(editor, 'span', 'kanji'),
    },
    {
      name: 'furiganaButton',
      text: 'ふりがな',
      tooltip: 'Furigana',
      shortcut: null,
      onAction: (editor) => actions.addTagAndClassOnSelection(editor, 'span', 'furigana'),
    },
  ],
};
