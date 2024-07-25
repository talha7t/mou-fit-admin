import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function RichTextAreaEditor({useFormPropObj, dataObj, styles}) {
  const editorRef = useRef(null);
  const handleEditorKeyUp = (e) => {
    if (editorRef.current) {
      console.log(editorRef.current)

      console.log(editorRef.current.getContent())
      useFormPropObj.setValue(`${useFormPropObj.formName}.${dataObj?.target ?? 'description'}`, editorRef.current.getContent());
    }
  };
  const log = (e) => {
    // e?.preventdefault()
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      useFormPropObj.setValue(`${useFormPropObj.formName}.${dataObj?.target ?? 'description'}`)
    }

    return false
  };
  return (
    <div style={{margin: styles?.margin,width: styles?.width}} >
      <Editor
        apiKey='3il4hj8a3picaak6m8r0zmbzqb4vkt6yrm7bji0c6dfgfl1w'
        onInit={(evt, editor) => editorRef.current = editor}
        // initialValue=''
        value={useFormPropObj.getValues(`${useFormPropObj.formName}.${dataObj?.target ?? 'description'}`)}
        onKeyUp={handleEditorKeyUp}
        init={{
          height: 150,
          padding: 0,
          branding: false, // @@ REMOVE BRAND LOGO
        //   statusbar: false,
        
          menubar: false,
          toolbar_location: 'bottom',
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px}'
        }}
        // tinymceScriptSrc="https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js"

      />
       <style global jsx>{`
        .tox:not(.tox-tinymce-inline).tox-tinymce--toolbar-bottom .tox-editor-header {
          padding: 0;
        }
        .tox .tox-tbtn {
            margin: 0 !important;
        }
        .tox .tox-tbtn--disabled {
            margin: 0 !important;
          }
      `}</style>
      {/* <button onClick={e => {log(e)}}>Log editor content</button> */}
    </div>
  );
}
