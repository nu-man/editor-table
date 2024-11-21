import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './MyEditor.css';

function MyEditor() {
  const [content, setContent] = useState({
    title: '',
    coverImageSrc: '',
    author: '',
    content: '',
    summary: '',
    tags: [],
    categories: [],
    // isPublished: false,
    publishedAt: new Date(),
  });
  // const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // const insertImageByUrl = () => {
  //   if (!imageUrl.trim()) {
  //     alert('Please enter a valid image URL.');
  //     return;
  //   }

  //   setContent(prevContent => ({
  //     ...prevContent,
  //     content: `${prevContent.content}<img src="${imageUrl}" alt="User Image" />`,
  //   }));
  //   setImageUrl('');
  // };

  const handleSubmit = async () => {
    if (!content.content.trim()) {
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
        body: JSON.stringify(content),
      });

      if (response.ok) {
        alert('Content saved successfully!');
        setContent({
          title: '',
          coverImageSrc: '',
          author: '',
          content: '',
          summary: '',
          tags: [],
          categories: [],
          isPublished: false,
          publishedAt: new Date(),
        });
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
      <input
        type="text"
        className="text-input"
        placeholder="Title"
        value={content.title}
        onChange={e => setContent({ ...content, title: e.target.value })}
      />
      <input
        type="text"
        className="text-input"
        placeholder="Cover Image URL"
        value={content.coverImageSrc}
        onChange={e => setContent({ ...content, coverImageSrc: e.target.value })}
      />
      <input
        type="text"
        className="text-input"
        placeholder="Author"
        value={content.author}
        onChange={e => setContent({ ...content, author: e.target.value })}
      />
      <textarea
        className="textarea-input"
        placeholder="Summary"
        value={content.summary}
        onChange={e => setContent({ ...content, summary: e.target.value })}
      />
      <CKEditor
        editor={ClassicEditor}
        data={content.content}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent({ ...content, content: data });
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
        }}
      />
      <input
        type="text"
        className="text-input"
        placeholder="Tags (comma-separated)"
        value={content.tags.join(', ')}
        onChange={e =>
          setContent({ ...content, tags: e.target.value.split(',').map(tag => tag.trim()) })
        }
      />
      <input
        type="text"
        className="text-input"
        placeholder="Categories (comma-separated)"
        value={content.categories.join(', ')}
        onChange={e =>
          setContent({ ...content, categories: e.target.value.split(',').map(cat => cat.trim()) })
        }
      />
      {/* <label>
        <input
          type="checkbox"
          checked={content.isPublished}
          onChange={e => setContent({ ...content, isPublished: e.target.checked })}
        />
        Published
      </label> */}
      <input
        type="datetime-local"
        className="datetime-input"
        value={content.publishedAt.toISOString().slice(0, 16)}
        onChange={e => setContent({ ...content, publishedAt: new Date(e.target.value) })}
      />
      {/* <div className="url-input-container">
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
      </div> */}
      <div className="preview-container">
        <h3 className="preview-heading">Content Preview</h3>
        <div className="preview preview-content">
          <h4>Title:</h4>
          <p>{content.title}</p>
          <h4>Cover Image:</h4>
          {content.coverImageSrc ? (
            <img src={content.coverImageSrc} alt="Cover" />
          ) : (
            <p>No cover image added.</p>
          )}
          <h4>Author:</h4>
          <p>{content.author}</p>
          <h4>Content:</h4>
          <div dangerouslySetInnerHTML={{ __html: content.content }} />
          <h4>Summary:</h4>
          <p>{content.summary}</p>
          <h4>Tags:</h4>
          <p>{content.tags.length ? content.tags.join(', ') : 'No tags added.'}</p>
          <h4>Categories:</h4>
          <p>{content.categories.length ? content.categories.join(', ') : 'No categories added.'}</p>
          <h4>Published:</h4>
          <p>{content.isPublished ? 'Yes' : 'No'}</p>
          <h4>Published At:</h4>
          <p>{content.publishedAt.toLocaleString()}</p>
        </div>
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


