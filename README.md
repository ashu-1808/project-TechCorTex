# 🚀 TechCortex | Industry-Oriented Tech Training Platform

![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge&logo=github)
![Tech Stack](https://img.shields.io/badge/Stack-Full--Stack-blue?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-orange?style=for-the-badge)

> **TechCortex** is a modern, high-performance web application designed to streamline student enrollment for advanced technology courses. It features a sleek, dark-themed UI and a robust, scalable backend architecture.

---

## 🌟 Key Features

*   **🎨 Modern UI/UX:** Built with **React 19**, **Vite**, and **Tailwind CSS**. Features smooth animations (`framer-motion`), responsive design, and a "Gen-Z" aesthetic.
*   **⚙️ Robust Backend:** Powered by **Java Spring Boot 3** (MVC), ensuring enterprise-grade security and scalability.
*   **🗄️ Reliable Persistence:** Uses **PostgreSQL** for data storage with efficient schema management and **Logback** for comprehensive logging (10MB rolling policy).
*   **🧪 Automated QA:** Includes a **Selenium** automation suite for end-to-end testing of user journeys.
*   **🔍 Full Validation:** Strict client-side and server-side validation using **Zod** patterns and **Jakarta Validation API**.

---

## 🛠️ Technology Stack

### **Frontend**
*   **Framework:** React 19 (TypeScript)
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **State/Forms:** React Hook Form
*   **Icons:** Lucide React
*   **Animations:** Framer Motion

### **Backend**
*   **Framework:** Spring Boot 3.2.2 (Java 17+)
*   **Database:** PostgreSQL 15+
*   **ORM:** Spring Data JPA (Hibernate)
*   **Logging:** SLF4J + Logback
*   **Build Tool:** Maven

### **Testing & QA**
*   **Automation:** Selenium WebDriver (Java)
*   **Driver Mgmt:** WebDriverManager

---

## 🚀 Getting Started

### **1. Prerequisites**
*   Node.js (v18+)
*   Java JDK (v17+)
*   Maven (v3.8+)
*   PostgreSQL (running locally on port 5432)

### **2. Database Setup**
Create a PostgreSQL database named `techcortex_db`. The application will automatically handle table creation.
```sql
CREATE DATABASE techcortex_db;
```

### **3. Backend Setup**
Navigate to the `backend` directory and run the Spring Boot application.
```bash
cd backend
# Verify application.properties has your DB credentials
mvn spring-boot:run
```
*   **API Health Check:** `http://localhost:8080/api/v1/health`
*   **Swagger/Docs:** (Optional: Add SpringDoc dependency for UI)

### **4. Frontend Setup**
Open a new terminal, navigate to the root, and start the Vite dev server.
```bash
npm install
npm run dev
```
*   **App URL:** `http://localhost:3000` (or `5173`)

---

## 🧪 Running Automated Tests

We have a dedicated **Selenium** automation suite located in the `qa/` directory. It simulates real user behavior (Filling forms -> Success Screen -> Navigation).

**To run the test:**
1.  Ensure Frontend and Backend are running.
2.  Run the Maven command in the `qa` folder:

```bash
cd qa
mvn clean compile exec:java
```
This will launch a Chrome browser and perform 5 complete application submissions automatically.

---

## 📂 Project Structure

```bash
TechCoretexv2/
├── backend/                 # Spring Boot API
│   ├── src/main/java        # Controller, Service, Repository, Model
│   ├── src/main/resources   # application.properties, logback-spring.xml
│   └── pom.xml
├── qa/                      # Selenium Automation Suite
│   ├── src/main/java        # FormFiller.java (Test Script)
│   └── pom.xml
├── src/                     # React Frontend
│   ├── components/          # Reusable UI Components
│   ├── pages/               # Application & Landing Pages
│   └── types.ts             # TypeScript Interfaces
├── scripts/                 # Utility scripts
├── package.json             # Frontend Dependencies
└── README.md                # Documentation
```

---

## 🛡️ API Specification

**Endpoint:** `POST /api/v1/apply`

**Payload:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "mobile": "+1 555 000 0000",
  "courses": ["devops", "cloud-computing"],
  "status": "Student",
  "learningMode": "Live Online",
  "batchType": "Weekend",
  "consent": true
}
```

---

## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/NewFeature`).
3.  Commit your changes.
4.  Push to the branch and open a Pull Request.

---

<p align="center">
  Made with ❤️ by the TechCortex Team
</p>