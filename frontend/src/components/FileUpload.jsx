import React from 'react'

const FileUpload = () => {
  return (
    <div className='flex justify-center  flex-col  items-center w-full h-full'>
     <h1 className='text-3xl font-bold'>Medical record Management App</h1> <br/>
      <input type="file" id='pdf-upload'  accept=".pdf" />
      
      <label for='pdf-upload' className='bg-yellow-500 rounded-sm w-auto p-3 my-2  text-black' >Choose PDF Document</label> <br/>
   
    </div>
  )
}
export default FileUpload
