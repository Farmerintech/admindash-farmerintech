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
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default MyEditor;
