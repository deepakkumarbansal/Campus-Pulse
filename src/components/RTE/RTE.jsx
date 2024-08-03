import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import {Container} from '../index';
import { useSelector } from 'react-redux';
const RTE = ({defaultValue='', setValue, className}) => {
    const userData = useSelector(state=>state.auth.userData);
    
    function handleChange(content){
        setValue('content',content);
    }

  return (
    <Container className={`relative ${className}`}>
      <Editor
        apiKey='8yc9gjdacy05owt7ghbg4ebfhlypyevu58pk4y0ttcar96rt'
        // onInit={(_evt, editor) => editorRef.current = editor}
        initialValue={defaultValue}
        init={{
          height: 500,
          menubar:false,
          placeholder: 'Press ⌥0 or Alt+0 for help',
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        // {...register('content')}
        onEditorChange={handleChange}
        />
      <p className='absolute w-full bottom-0 bg-white text-end pr-8 text-gray-700 font-extrabold'>{userData ? `- ${userData.$id}` : <span>&nbsp;</span>}</p>
    </Container>
  )
}

export default RTE
