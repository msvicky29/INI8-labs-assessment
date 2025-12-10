import React,{useState} from 'react'
import CloudImage from '../assets/cloud-icon.png'
import pdfImage from '../assets/pdf.png'
import axios from 'axios';
import toast from 'react-hot-toast';

const FileUpload = () => {
  const API_URL='http://localhost:8000';
  const [selectedFile,setSelectedFile]=useState('');
  const [isUploading,setIsUploading]=useState(false);

  const handleFileChange=(event)=>{
   const file = event.target.files && event.target.files[0];
    if(file && file.type==='application/pdf'){
      setSelectedFile(file);
      console.log('Selected file:',file);
    }else{
     setSelectedFile('');
    }
  }
  const handleUpload=async()=>{
    try {
      if(!selectedFile){
        toast.error('Please select a PDF file to upload');
        return;
      }
      setIsUploading(true);
      const formData=new FormData();
      formData.append('pdf',selectedFile);
      console.log('Form Data:',formData.get('pdf'));
      const response=await axios.post(`${API_URL}/api/upload-document`,formData,
        {
          headers:{
            'Content-Type':'multipart/form-data'
          }
        }
      )
      console.log('Upload response:',response.data);

      toast.success('Document uploaded successfully');
      setSelectedFile('');
      setIsUploading(false);
      
    } catch (error) {
      toast.error('Error in uploading document');
    }
  }
  const handleDeselect=()=>{
    toast.success("Document deleted successfully");
    setSelectedFile('');
  }
  return (
    <div className='flex justify-center  flex-col  items-center w-full h-full'>
      <h1 className='text-3xl font-bold'>Medical record Management App</h1> <br />
      <input type="file" id='pdf-upload'  onChange={handleFileChange} className='w-[0.1px]' accept=".pdf" />
      <div className='border border-dashed w-96 px-11 h-44 rounded-sm flex flex-col justify-center items-center'>
        <label htmlFor='pdf-upload'>
          <img src={CloudImage} alt="cloud-upload" className='w-24 h-24 cursor-pointer' />
        </label>
        <p>Browse docuement</p>
      </div>
      {selectedFile &&
       <div className='flex my-4 p-3 w-auto border border-slate-400 rounded-md justify-between   items-center'>
      <img src={pdfImage} alt='pdf-icon' className='w-7' />
      <p className=' ml-9'>{selectedFile.name}</p>
      <p className=' ml-7 font-bold text-red-600 cursor-pointer ' onClick={handleDeselect}>X</p>
      
       </div>
      }
      <button onClick={handleUpload} className='bg-amber-600 text-white px-4 py-2 cursor-pointer rounded-md mt-4'>
        {isUploading?'Uploading...':'Upload Document'}
      </button>
    </div>
  )
}
export default FileUpload
