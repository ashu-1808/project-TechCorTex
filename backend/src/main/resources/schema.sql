-- Enable UUID extension if needed (usually available by default in modern pg, or pgcrypto)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS applications (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    location VARCHAR(100),
    college_name VARCHAR(150),
    status VARCHAR(50) NOT NULL,
    current_course VARCHAR(100),
    current_year VARCHAR(50),
    grad_year VARCHAR(4),
    learning_mode VARCHAR(50) NOT NULL,
    batch_type VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    study_partner VARCHAR(100),
    referral_source VARCHAR(50) NOT NULL,
    consent BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS application_courses (
    application_id BIGINT NOT NULL,
    course_id VARCHAR(50) NOT NULL,
    FOREIGN KEY (application_id) REFERENCES applications(id)
);

CREATE INDEX IF NOT EXISTS idx_application_email ON applications(email);
