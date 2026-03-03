# Techcortex Backend API Specification

This document outlines the API endpoints required to power the Techcortex landing page and application form. Use this specification to generate the backend logic, database models, and validation schemas.

## Base Configuration
- **Base URL:** `/api/v1`
- **Content-Type:** `application/json`

---

## 1. Applications Endpoint

### **Submit Application**
**Endpoint:** `POST /apply`  
**Description:** Receives new student applications from the enrollment form.

#### **Request Body Schema (JSON)**
The backend should validate that required fields are present.

```json
{
  "fullName": "John Doe",             // Required, String
  "email": "john@example.com",        // Required, Valid Email String
  "mobile": "+1 555 123 4567",        // Required, String
  "location": "New York, NY",         // Optional, String
  "collegeName": "Tech University",   // Required if status == 'Student', String
  
  "status": "Student",                // Required, Enum: ['Student', 'Fresher', 'Professional', 'Career Switcher']
  "currentCourse": "B.Tech CS",       // Optional, String
  "currentYear": "3rd Year",          // Optional, String
  "gradYear": "2025",                 // Optional, String (Number-like)

  "courses": ["cloud-computing", "aiml-deeplearning"],  // Required, Array of Strings. Allowed values: ['cloud-computing', 'devops', 'aiml-deeplearning', 'fullstack-java-python', 'mean-mern', 'ai-integrations', 'webapp-dev', 'industry-project-1', 'industry-project-2']
  "learningMode": "Live Online",      // Required, Enum: ['Live Online', 'Self-Paced', 'Mentorship']
  "batchType": "Weekend",             // Required, Enum: ['Weekday', 'Weekend']
  
  "message": "I want to learn...",    // Required, String
  "studyPartner": "Jane Doe",         // Optional, String
  "referralSource": "Google",         // Required, Enum: ['Google', 'Social Media', 'Friend', 'Campus']
  "consent": true                     // Required, Boolean (Must be true)
}
```

#### **Success Response (201 Created)**
```json
{
  "success": true,
  "message": "Application submitted successfully.",
  "data": {
    "applicationId": "app_123456789"
  }
}
```

#### **Error Response (400 Bad Request)**
```json
{
  "success": false,
  "error": "Validation Error",
  "details": [
    { "field": "email", "message": "Invalid email format" },
    { "field": "courses", "message": "At least one course must be selected" }
  ]
}
```

---

## 2. General / Utility Endpoints (Optional)

### **Health Check**
**Endpoint:** `GET /health`  
**Description:** Simple check to ensure API is running.
**Response:** `200 OK`

---

## Backend Implementation Suggestions (For AI Agent)

1.  **Tech Stack:** Node.js (Express) or Python (FastAPI).
2.  **Database:** MongoDB (recommended for flexible schema) or PostgreSQL.
3.  **Validation:** Use Zod (Node.js) or Pydantic (Python) to strictly validate the "Request Body Schema" above, especially the Enums for `status`, `courses`, `learningMode`, `batchType`, and `referralSource`.
4.  **Notifications:** 
    - Trigger an email to the admin (`admin@techcortex.com`) with the applicant details.
    - Trigger a confirmation email to the applicant's `email` address.
