export default {
  addTagAndClassOnSelection: (editor, tag, classname) => {
    const content = editor.selection.getContent({
      format: 'text',
    });
    editor.insertContent(`<${tag} class=${classname} >${content}</${tag}>`);
  },
};
