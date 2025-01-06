import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css";
import "../customs/quill.css"
import { useState } from "react";



type EditorProps = {
  content: string,
  setContent: (content: string) => void;
}

function Editor({content,  setContent }: EditorProps) {
  const [count, setCount] = useState("0");

  const toolbarOptions = [
    [{ 'header': [2, 3, 4, false] }],
    ['bold', 'italic', 'underline'],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image'],
    [{ 'align': [] }]
  ];

  const modules = {
    toolbar: toolbarOptions
  }

  function handleContentChange(c: string) {
    //Remove html tags
    const text = c.replace(/<[^>]*>/g, " ");
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    setCount(wordCount.toString());
    setContent(c);
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-md tablet:text-lg leading-4">Content</h3>
        <p className="self-end text-xs font-semibold">Words:{count}</p>
      </div>
      <ReactQuill
        theme="snow"
        modules={modules}
        value={content}
        onChange={handleContentChange}
      />
    </div>
  )
}
export default Editor