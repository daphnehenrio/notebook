/* eslint-disable no-multi-str */
/* eslint-disable camelcase */
// ? Plugins
const plugins = [
  'advlist anchor autolink charmap code codesample',
  'directionality emoticons fullscreen help hr image importcss insertdatetime',
  'link lists media nonbreaking noneditable pagebreak paste preview print',
  'quickbars save searchreplace table template textpattern visualblocks visualchars',
  'wordcount',
];

// ? Menu
const menubar = 'fav file edit view insert format tools table help';
const contextmenu = 'link image imagetools table';

// ? Toolbar
const toolbar = 'undo redo | bold italic underline strikethrough | \
fontselect fontsizeselect formatselect | \
alignleft aligncenter alignright alignjustify | \
outdent indent |  numlist bullist | forecolor backcolor removeformat | \
charmap emoticons | fullscreen  preview save print | \
insertfile image media template link anchor codesample | kanjiButton furiganaButton insertUsername ltr rtl';
const toolbar_sticky = true;
const quickbars_selection_toolbar = 'bold italic underline forecolor backcolor kanjiButton furiganaButton | \
quicklink h2 h3 blockquote quickimage quicktable customformat';

// ? Emoticons
const emoticons_append = {
  custom_mind_explode: {
    keywords: ['brain', 'mind', 'explode', 'blown'],
    char: '🤯',
  },
};

// ? Lists
const link_list = [{
  title: 'My page 1',
  value: 'https://www.tiny.cloud',
},
{
  title: 'My page 2',
  value: 'http://www.moxiecode.com',
},
];
const image_list = [{
  title: 'My page 1',
  value: 'https://www.tiny.cloud',
},
{
  title: 'My page 2',
  value: 'http://www.moxiecode.com',
},
];
const image_class_list = [{
  title: 'None',
  value: '',
},
{
  title: 'Some class',
  value: 'class-name',
},
];

// ? Styles
const importcss_append = true;
const formats = {
  customformat: {
    inline: 'span', styles: { color: '#00ff00', fontSize: '20px' }, attributes: { title: 'My custom format' }, classes: 'example1',
  },
};
const style_formats = [
  {
    title: 'Headings',
    items: [{
      title: 'Heading 1',
      format: 'h1',
    },
    {
      title: 'Heading 2',
      format: 'h2',
    },
    {
      title: 'Heading 3',
      format: 'h3',
    },
    {
      title: 'Heading 4',
      format: 'h4',
    },
    {
      title: 'Heading 5',
      format: 'h5',
    },
    {
      title: 'Heading 6',
      format: 'h6',
    },
    ],
  },
  {
    title: 'Inline',
    items: [{
      title: 'Bold',
      format: 'bold',
    },
    {
      title: 'Italic',
      format: 'italic',
    },
    {
      title: 'Underline',
      format: 'underline',
    },
    {
      title: 'Strikethrough',
      format: 'strikethrough',
    },
    {
      title: 'Superscript',
      format: 'superscript',
    },
    {
      title: 'Subscript',
      format: 'subscript',
    },
    {
      title: 'Code',
      format: 'code',
    },
    ],
  },
  {
    title: 'Blocks',
    items: [{
      title: 'Paragraph',
      format: 'p',
    },
    {
      title: 'Blockquote',
      format: 'blockquote',
    },
    {
      title: 'Div',
      format: 'div',
    },
    {
      title: 'Pre',
      format: 'pre',
    },
    ],
  },
  {
    title: 'Align',
    items: [{
      title: 'Left',
      format: 'alignleft',
    },
    {
      title: 'Center',
      format: 'aligncenter',
    },
    {
      title: 'Right',
      format: 'alignright',
    },
    {
      title: 'Justify',
      format: 'alignjustify',
    },
    ],
  },
  { title: 'Custom format', format: 'customformat' },
];

// ? Images
const image_advtab = true;
const image_caption = true;
const imagetools_cors_hosts = ['picsum.photos'];

// ? Export initial settings
export default {
  contextmenu,
  emoticons_append,
  formats,
  importcss_append,
  image_list,
  image_class_list,
  image_advtab,
  image_caption,
  imagetools_cors_hosts,
  link_list,
  menubar,
  plugins,
  quickbars_selection_toolbar,
  style_formats,
  toolbar,
  toolbar_sticky,
};
