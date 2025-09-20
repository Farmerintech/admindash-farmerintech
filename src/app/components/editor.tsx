import { Editor } from '@tinymce/tinymce-react';
import { FC } from 'react';

// Type for props
interface EditorProps {
  value?: string;
  onChange: (content: string) => void;
}

const MyEditor: FC<EditorProps> = ({ value = '', onChange }) => {
  const handleEditorChange = (content: string) => {
    console.log('Editor content was updated:', content);
    onChange(content);
  };

  // TinyMCE v6 expects a Promise-based image upload handler
  const handleImageUpload = async (blobInfo: any): Promise<string> => {
    if (!blobInfo || typeof blobInfo.blob !== 'function') {
      throw new Error('Invalid image data. Please try a different image.');
    }

    const formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());

    const response = await fetch(
      'https://citadel-i-project.onrender.com/api/v1/note/upload_cover_image',
      {
        method: 'POST',
        credentials: 'include',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('HTTP Error: ' + response.status);
    }

    const json = await response.json();

    if (!json || typeof json.location !== 'string') {
      throw new Error('Invalid JSON response: ' + JSON.stringify(json));
    }

    return json.location; // TinyMCE will insert the image with this URL
  };

  return (
    <Editor
      apiKey="6w9bc8dum7gzu0h6fqaiexu8tr2lsk22vprqlh3kz2znncio"
      value={value}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'help',
          'wordcount',
        ],
        toolbar:
          'undo redo | formatselect | bold italic | alignleft aligncenter alignright | outdent indent | link image',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        images_upload_handler: handleImageUpload,
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default MyEditor;
