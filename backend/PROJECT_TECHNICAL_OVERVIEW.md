# TechCortex Project Technical Overview

This document serves as a technical reference for the TechCortex project, split into Backend and Frontend analysis. It is intended to provide immediate context for AI agents or developers joining the project.

---

## 1. Backend Architecture (Spring Boot)

### **Core Stack**
- **Language:** Java 17
- **Framework:** Spring Boot 3.2.2
- **Build Tool:** Maven
- **Database:** PostgreSQL (Driver: `org.postgresql.Driver`)
- **ORM:** Spring Data JPA / Hibernate

### **Project Structure**
The backend follows a standard **Controller-Service-Repository** layered architecture:

- **Controller (`com.techcortex.backend.controller`):** Handles HTTP requests, validation, and responses.
- **Service (`com.techcortex.backend.service`):** Contains business logic (e.g., transaction management).
- **Repository (`com.techcortex.backend.repository`):** Interface for database CRUD operations (extends `JpaRepository`).
- **Model/Entity (`com.techcortex.backend.model`):** Maps Java objects to database tables.
- **DTO (`com.techcortex.backend.dto`):** Data Transfer Objects for safe API communication (separating internal models from external APIs).

### **Database Schema**
**Database Name:** `techcortex_db`

#### **Table: `applications`**
Primary entity for storing user course applications.
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGSERIAL` | `PRIMARY KEY` | Auto-incrementing ID |
| `full_name` | `VARCHAR(100)` | `NOT NULL` | Applicant's name |
| `email` | `VARCHAR(255)` | `NOT NULL` | Indexed for lookup |
| `mobile` | `VARCHAR(20)` | `NOT NULL` | |
| `status` | `VARCHAR(50)` | `NOT NULL` | e.g., "Student", "Working Professional" |
| `courses` | `ElementCollection` | | Stored in side-table `application_courses` |
| `consent` | `BOOLEAN` | `DEFAULT FALSE` | GDPR/Privacy consent |
| `created_at` | `TIMESTAMP` | | Auto-generated timestamp |
| *(Other fields)* | | | `location`, `college_name`, `message`, etc. |

#### **Table: `application_courses`**
Side table for the `@ElementCollection` (One-to-Many relationship for courses).
- `application_id`: FK referencing `applications.id`
- `course_id`: String ID of the course

### **API Contract**

#### **1. Submit Application**
- **Endpoint:** `POST /api/v1/apply`
- **Content-Type:** `application/json`
- **CORS:** Allowed for `localhost:3000`, `localhost:5173`.

**Request Body (JSON):**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "mobile": "1234567890",
  "location": "New York",
  "collegeName": "Tech University",
  "status": "Student",
  "currentCourse": "B.Tech",
  "currentYear": "3rd Year",
  "gradYear": "2024",
  "courses": ["fullstack-java", "react-native"],
  "learningMode": "Online",
  "batchType": "Weekend",
  "message": "Interested in placement support.",
  "studyPartner": "No",
  "referralSource": "LinkedIn",
  "consent": true
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Application submitted successfully.",
  "data": {
    "applicationId": 123
  }
}
```

#### **2. Health Check**
- **Endpoint:** `GET /api/v1/health`
- **Response:** `200 OK` "TechCortex Backend is running!"

---

## 2. Frontend Architecture (React + Vite)

*Note: Based on provided project context.*

### **Core Stack**
- **Framework:** React 18+
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS

### **Design System**
- **Theme:** Dark / Industrial.
- **Color Palette:** Charcoal/Black backgrounds with Bronze/Gold accents.
- **UI Components:** Custom components using Tailwind utility classes.

### **Key Libraries**
- **Routing:** `react-router-dom` (using `HashRouter`).
- **Form Handling:** `react-hook-form` (Managing complex validation and multi-select states).
- **HTTP Client:** Likely `axios` or standard `fetch` (Needs to be configured to point to `http://localhost:8080`).

### **Current Status & Integration Goals**
- **Current State:** The "Apply Now" form is currently mocked (uses `setTimeout` to simulate network request).
- **Goal:** Replace the mock submission with a real API call to the backend endpoint detailed above (`POST /api/v1/apply`).
- **Payload Matching:** Frontend form data structure must strictly match the `ApplicationRequest` DTO in the backend to avoid 400 Bad Request errors.

---

## 3. Deployment & Environment
- **Backend Port:** `8080`
- **Frontend Port:** `5173` (Vite default) or `3000`.
- **Database:** PostgreSQL on `localhost:5432`.
- **Credentials:** `postgres` / `pass@123` (Dev environment).
