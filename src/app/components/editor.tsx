import { Editor } from '@tinymce/tinymce-react';
import { FC } from 'react';

// Type for props
interface EditorProps {
  value?: string;
  onChange: (content: string) => void;
}

const MyEditor: FC<EditorProps> = ({ value = '', onChange }) => {
  const handleEditorChange = (content: string, editor: any) => {
    console.log("Editor content was updated: ", content);
    onChange(content);
  };

  const handleImageUpload = async (blobInfo: any, success: any, failure: any) => {
    // Crucial check to ensure blobInfo and its methods are available
    if (!blobInfo || typeof blobInfo.blob !== 'function') {
      console.error("Error: blobInfo is undefined or blob() is not a function.");
      failure('Invalid image data. Please try a different image.');
      return;
    }

    const formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());

    try {
      const response = await fetch('https://citadel-i-project.onrender.com/api/v1/note/upload_cover_image', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('HTTP Error: ' + response.status);
      }

      const json = await response.json();

      if (!json || typeof json.location !== 'string') {
        throw new Error('Invalid JSON response: ' + JSON.stringify(json));
      }

      success(json.location);

    } catch (error: any) {
      console.error('Upload failed:', error.message);
      failure('Upload failed: ' + error.message);
    }
  };

  return (
    <Editor
      apiKey="6w9bc8dum7gzu0h6fqaiexu8tr2lsk22vprqlh3kz2znncio"
      value={value}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic | alignleft aligncenter alignright | outdent indent | link image',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        images_upload_handler: handleImageUpload
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default MyEditor;
