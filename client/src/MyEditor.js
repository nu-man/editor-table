import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './MyEditor.css';

function MyEditor() {
  const [content, setContent] = useState('');

  return (
    <div className="container">
      <h1 className="heading">CKEditor with Image Support</h1>
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
        config={{
          toolbar: [
            'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
            'insertTable', 'imageUpload', '|', 'undo', 'redo'
          ],
          image: {
            toolbar: [
              'imageTextAlternative', 'imageStyle:full', 'imageStyle:side'
            ]
          },
          table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
          }
        }}
      />
      <div className="preview-container">
        <h3 className="preview-heading">Content Preview</h3>
        <div
          className="preview preview-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}

export default MyEditor;
