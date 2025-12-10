# Patient Portal - Medical Document Management

## Project Overview
- Simple web app for patients to upload, list, download, and delete medical PDFs.
- Stack: React (Vite) + Express (Node) + MongoDB + Multer for PDF uploads.
- Files stored in `/backend/uploads`, metadata stored in MongoDB.

## Requirements
- Node.js (latest)
- Git
- MongoDB (local) or a MongoDB URI in `.env`

## Installation & Run (Local)
1. **Clone the repo**
```
git clone https://github.com/msvicky29/INI8-labs-assessment.git
cd INI8-labs-assessment
```

2. **Install dependencies**
```
cd backend
npm install
cd ../frontend
npm install
```

3. **Environment**
- In `backend/.env`, set `MONGODB_URI=<your_mongo_connection_string>`

4. **Start backend**
```
cd backend
npm start
```

5. **Start frontend (new terminal)**
```
cd frontend
npm run dev
```
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000/api`

## Example API Calls

### Upload PDF
```
curl -X POST http://localhost:8000/api/upload-document \
  -H "Content-Type: multipart/form-data" \
  -F "pdf=@/path/to/file.pdf"
```


### List Documents
```
curl http://localhost:8000/api/get-all-documents
```

### Download Document
```
curl -L http://localhost:8000/api/download-document/<documentId> -o file.pdf
```

### Delete Document
```
curl -X DELETE http://localhost:8000/api/delete-document/<documentId>
```

### Postman API-List all Document
- List of all API end point in the backend server,use Postman/Curl for testing
```javascript
router.get('/get-all-documents',getAllDocuments);
router.post('/upload-document',upload.single("pdf"),uploadDocument);
router.get('/download-document/:id',downloadDocument);
router.delete('/delete-document/:id',deleteDocument);
```

## Notes
- PDF only uploads (validated by Multer).
- Files served from `http://localhost:8000/uploads/<filename>`.
- For multiple users, add auth and filter by `userId`.
