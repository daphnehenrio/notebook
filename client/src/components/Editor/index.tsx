// ? Import NPM
import * as React from 'react';
import {
  Editor as EditorTiny,
} from '@tinymce/tinymce-react';

import {
  Editor as EditorType,
} from 'tinymce';

// ? Import Local
// | Settings
import initialSettings from './settings';
// | Setup
import setCustomButtons from './setup';
// | Styles
import './index.scss';

const TINY_API_KEY = process.env.REACT_APP_TINY_API_KEY;

const Editor = () => {
  const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const handleEditorChange = (e: any) => {
    console.log('Content was updated:', e.target.getContent());
  };

  const save_onsavecallback = (currentEditor: EditorType) => {
    console.log('Content was saved:', currentEditor.getContent());
  };

  const filePickerCallback = (callback: Function, value: any, meta: any) => {
    /* Provide file and text for the link dialog */
    if (meta.filetype === 'file') {
      callback('https://www.google.com/logos/google.jpg', {
        text: 'My text',
      });
    }

    /* Provide image and alt text for the image dialog */
    if (meta.filetype === 'image') {
      callback('https://www.google.com/logos/google.jpg', {
        alt: 'My alt text',
      });
    }

    /* Provide alternative source and posted for the media dialog */
    if (meta.filetype === 'media') {
      callback('movie.mp4', {
        source2: 'alt.ogg',
        poster: 'https://www.google.com/logos/google.jpg',
      });
    }
  };

  return (
    <EditorTiny
      apiKey={TINY_API_KEY}
      initialValue="<p>This is the initial content of the editor</p>"
      init={{
        ...initialSettings,
        skin: useDarkMode ? 'oxide-dark' : 'oxide',
        content_css: useDarkMode ? 'dark, /my-styles.css' : 'default, /my-styles.css',
        file_picker_callback: filePickerCallback,
        setup: (editor) => {
          setCustomButtons(editor);
        },
        save_onsavecallback,
      }}
      onChange={handleEditorChange}
    />
  );
};

export default Editor;
