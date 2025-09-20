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

  const handleImageUpload = (blobInfo: any, success: any, failure: any) => {

  const formData = new FormData();

  formData.append('file', blobInfo.blob(), blobInfo.filename());



  fetch('https://citadel-i-project.onrender.com/api/v1/note/upload_cover_image', {

    method: 'POST',

    body: formData,

    // Add custom headers if needed, e.g., an authentication token

    // headers: {

    //   'Authorization': 'Bearer YOUR_AUTH_TOKEN'

    // }

  })

  .then(response => {

    if (!response.ok) {

      throw new Error('HTTP Error: ' + response.status);

    }

    return response.json();

  })

  .then(json => {

    if (!json || typeof json.location !== 'string') {

      failure('Invalid JSON: ' + JSON.stringify(json));

      return;

    }

    success(json.location);

  })

  .catch(error => {

    failure('Upload failed: ' + error.message);

  });

};



        
  return (
    <Editor
      apiKey="6w9bc8dum7gzu0h6fqaiexu8tr2lsk22vprqlh3kz2znncio" // Replace with your actual API key or use `tinymce.init` for self-hosted
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
