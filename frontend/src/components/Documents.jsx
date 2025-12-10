import React, { useState, useEffect } from 'react'
import axios from 'axios';
import pdfImage from '../assets/pdf.png'
const Documents = () => {
  const API_URL='http://localhost:8000';
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleView = (filepath) => {
    const filename = filepath.split(/[/\\]/).pop();
    const fileUrl = `${API_URL}/uploads/${filename}`;
    window.open(fileUrl, '_blank');
  }

  const handleDownload = async (documentId, filename) => {
    try {
      const response = await axios.get(`${API_URL}/api/download-document/${documentId}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Error downloading document");
    }
  }

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/get-all-documents`)
        setDocuments(response.data.data);
        console.log("Documents fetched:", response.data.data);
      }
      catch (err) {
        console.error("Error fetching documents", err);
      }
    }
    fetchDocuments();
  }, [])

  const handleDelete = async (documentId) => {
      
          if(!window.confirm("Are you sure you want to delete this document?")){
              return;
          }
          setLoading(true);

          try{
            await axios.delete(`${API_URL}/api/delete-document/${documentId}`);
            setDocuments(documents.filter(doc=>doc._id!==documentId));
            alert("Document deleted successfully");
            setLoading(false);
          }
          catch(error){
              alert("Error in deleting document");
              setLoading(false);
          }
          
      
  }


  return (
    <div>
      <h1 className='text-3xl mb-9 font-bold'>Documents Page</h1>
      <div className='grid grid-cols-1  md:grid-cols-3  gap-6'>
        {documents.map((doc) => (
          <div key={doc._id} className='border  p-4  my-2 items-center rounded-md'>
            <div className='flex items-center justify-between mb-4'>
              <img src={pdfImage} alt='pdf-icon' className='w-14 mb-2' />
              <div>
                <p className='font-semibold'>Filename: {doc.filename}</p>
                <p>Filesize: {(doc.filesize / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <div className='flex justify-between mt-4 gap-3'>
              <button
                onClick={() => handleView(doc.filepath)}
                className='flex-1 flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg  bg-indigo-600 text-white hover:bg-indigo-700 transition duration-150 shadow-md'
              >
                <span>View</span>
              </button>
              <button
                onClick={() => handleDownload(doc._id, doc.filename)}
                className='flex-1 flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg  bg-green-600 text-white hover:bg-green-700 transition duration-150 shadow-md'
              >
                <span>Download</span>
              </button>
              <button
                onClick={()=>handleDelete(doc._id)}
                className='flex-1 flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg  bg-red-600 text-white hover:bg-red-700 transition duration-150 shadow-md'
              >
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Documents
