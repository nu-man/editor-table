import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './MyEditor.css';

function MyEditor() {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // State to store the image URL
  const [loading, setLoading] = useState(false);

  // Function to add the image URL into the editor
  const insertImageByUrl = () => {
    if (!imageUrl.trim()) {
      alert('Please enter a valid image URL.');
      return;
    }

    setContent(prevContent => `${prevContent}<img src="${imageUrl}" alt="User Image" />`);
    setImageUrl(''); // Clear the input field after insertion
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!content.trim()) {
      alert('Editor content is empty!');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('api endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        alert('Content saved successfully!');
        setContent(''); // Clear the editor after successful submission
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save content. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Editor</h1>
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
        config={{
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
  
            'imageUpload',
            '|',
            'undo',
            'redo',
          ],
          image: {
            toolbar: [
              'imageTextAlternative',
              'imageStyle:full',
              'imageStyle:side',
            ],
          },
          table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
          },
        }}
      />
      <div className="url-input-container">
        <h3>Add Image by URL</h3>
        <input
          type="text"
          className="image-url-input"
          value={imageUrl}
          placeholder="Enter image URL here..."
          onChange={e => setImageUrl(e.target.value)}
        />
        <button className="insert-button" onClick={insertImageByUrl}>
          Insert Image
        </button>
      </div>
      <div className="preview-container">
        <h3 className="preview-heading">Content Preview</h3>
        <div
          className="preview preview-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Content'}
      </button>
    </div>
  );
}

export default MyEditor;
