import { Editor } from 'tinymce';

export default {
  addTagAndClassOnSelection: (
    editor: Editor,
    tag: string,
    classname: string
  ): void => {
    const content: string = editor.selection.getContent({
      format: 'text',
    });
    editor.insertContent(`<${tag} class=${classname} >${content}</${tag}>`);
  },
};
