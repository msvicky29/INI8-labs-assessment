
import React from 'react'
import FileUpload from './components/FileUpload'
import NavBar from './components/NavBar'      
import Documents from './components/Documents'
import { Route, Routes } from 'react-router-dom'
function App() {
 

  return (
    <>
    <NavBar />
    <div className='p-12'>
     <Routes>
     <Route path='/' element={  <FileUpload />} />
      <Route path='/documents' element={<Documents />} />
     </Routes>
    </div>

    </>
  )
}

export default App
