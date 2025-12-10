# Patient Portal - Medical Document Management System
## Design Document

---

## 1. Tech Stack Choices

### Q1. What frontend framework did you use and why?

**React**

- Component-based architecture for reusable UI components
- Large ecosystem and community support
- Fast development with Vite
- Good performance with Virtual DOM
- Simple state management with hooks

**Additional:** Vite (build tool), TailwindCSS (styling), Axios (HTTP client)

---

### Q2. What backend framework did you choose and why?

**Express.js (Node.js)**

- Same language (JavaScript) for frontend and backend
- Lightweight and flexible
- Great middleware support (Multer for file uploads)
- Fast API development
- Good for handling file uploads/downloads

**Additional:** Multer (file uploads), Mongoose (MongoDB), CORS, dotenv

---

### Q3. What database did you choose and why?

**MongoDB**

- Document-based storage fits JavaScript/Node.js well
- Flexible schema - easy to add new fields
- Perfect for storing file metadata
- Easy integration with Express via Mongoose
- Good scalability options

---

### Q4. If you were to support 1,000 users, what changes would you consider?

**Changes needed:**

1. **User Authentication**
   - Add user identification (JWT or sessions)
   - Filter documents by `userId` in all queries
   - Verify ownership before download/delete
   - By changing the userId ,the user can be filtered out
```javascript
const newDocument = new Documents({
            userId: "default_user", // Single user - no login needed
            filename: req.file.originalname,
            filepath: req.file.path,
            filesize: req.file.size,
            createdAt: Date.now()
        })
```

2. **Database Optimization**
   - Add indexes on `userId` and `createdAt`
   - Implement pagination for document lists

3. **File Storage**
   - Organize files by user: `/uploads/user_123/document.pdf`
   - Consider cloud storage (AWS S3, Azure Blob) for scalability

4. **API Changes**
   - All endpoints filter by user ID
   - Add rate limiting
   - Enforce file size limits (e.g 10MB per file)

5. **Performance**
   - Add Redis caching
   - Load balancing for multiple servers
   - CDN for file downloads

6. **Security**
   - Enhanced input validation
   - Virus scanning for uploads



---

## 2. Architecture Overview

### System Flow

```
Frontend (React) → Backend (Express) → MongoDB + File System
```

**Architecture Diagram:** ![Image](https://github.com/msvicky29/INI8-labs-assessment/blob/main/Flow%20diagram.png?raw=true)

**Components:**

1. **Frontend (React)**
   - FileUpload: PDF file selection and upload
   - Documents: Display list with view/download/delete
   - NavBar: Navigation
   - Uses Axios for API calls

2. **Backend (Express.js)**
   - Routes: API endpoints
   - Controllers: Business logic
   - Middleware: Multer (uploads), CORS, JSON parser
   - Serves static files from `/uploads`

3. **Database (MongoDB)**
   - Stores metadata: userId, filename, filepath, filesize, createdAt

4. **File Storage**
   - PDF files in `backend/uploads/` directory

---

## 3. API Specification

### Base URL
```
http://localhost:8000/api
```

### Endpoints

#### 1. Upload a PDF File

**POST /upload-document**

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: FormData with `pdf` field

**Sample Request:**
```javascript
const formData = new FormData();
formData.append('pdf', file);
axios.post('/api/upload-document', formData);
```

**Success Response (201):**
```json
{
  "message": "Document uploaded successfully",
  "document": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "default_user",
    "filename": "prescription.pdf",
    "filepath": "uploads/prescription.pdf1765304861218.pdf",
    "filesize": 245678,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error:** 400 (no file), 500 (server error)

---

#### 2. List All Documents

**GET /get-all-documents**

**Request:**
- Method: GET

**Success Response (200):**
```json
{
  "message": "Documents fetched successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "filename": "prescription.pdf",
      "filepath": "uploads/prescription.pdf1765304861218.pdf",
      "filesize": 245678,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**Error:** 500 (server error)

---

#### 3. Download a File

**GET /download-document/:id**

**Request:**
- Method: GET
- URL Parameter: `id` (document ID)

**Success Response (200):**
- Content-Type: application/pdf
- Body: Binary PDF file
- Blob response is fetched make a downloadable file using frontend logic

```javascript
 const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
```

**Error:** 400 (no ID), 404 (not found), 500 (server error)

---

#### 4. Delete a File

**DELETE /delete-document/:id**

**Request:**
- Method: DELETE
- URL Parameter: `id` (document ID)

**Success Response (200):**
```json
{
  "message": "Document deleted successfully"
}
```

**Error:** 400 (no ID), 404 (not found), 500 (server error)

---

## 4. Data Flow Description

### Q5. Describe the step-by-step process of what happens when a file is uploaded and when it is downloaded.

#### File Upload Flow:

1. User selects PDF and clicks upload
2. Frontend creates FormData and sends POST request to `/api/upload-document`
3. Multer middleware validates PDF, saves file to `/uploads` folder
4. Controller extracts file info (filename, path, size)
5. Creates document record in MongoDB with metadata
6. Returns success response with document data
7. Frontend displays success message

#### File Download Flow:

1. User clicks download button
2. Frontend sends GET request to `/api/download-document/:id` with `responseType: 'blob'`
3. Backend finds document in MongoDB by ID
4. Checks if file exists on filesystem
5. Backend streams file using `res.download()`
6. Frontend receives blob, creates temporary download link
7. Browser downloads file to user's computer
8. Frontend cleans up temporary resources

---

## 5. Assumptions

### Q6. What assumptions did you make while building this?

1. **Single user** - No authentication, hardcoded `userId: "default_user"`
2. **PDF only** - Only PDF files accepted
3. **Local development** - Runs on localhost, files in local filesystem
4. **No file size limits** - Assumed reasonable file sizes
5. **Basic error handling** - Console logging, alert messages
6. **No authentication** - All documents accessible to everyone (single user)
7. **No HTTPS** - Development only
8. **Unlimited storage** - No quotas or cleanup
9. **Modern browsers** - ES6+ and Blob API support
10. **Stable network** - No handling for network interruptions

---
