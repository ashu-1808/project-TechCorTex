export type CourseId = 
  | 'cloud-computing' 
  | 'devops' 
  | 'aiml-deeplearning' 
  | 'fullstack-java-python' 
  | 'mean-mern' 
  | 'ai-integrations' 
  | 'webapp-dev' 
  | 'industry-project-1' 
  | 'industry-project-2';

export interface Course {
  id: CourseId;
  title: string;
  description: string;
  duration: string;
  level: string;
  iconName: string;
  features: string[];
  techStack?: string[];
}

export type LearningMode = 'Live Online' | 'Self-Paced' | 'Mentorship';
export type BatchType = 'Weekday' | 'Weekend';
export type StudentStatus = 'Student' | 'Fresher' | 'Professional' | 'Career Switcher';

export interface ApplicationFormData {
  // Personal
  fullName: string;
  email: string;
  mobile: string;
  location?: string;
  collegeName?: string;

  // Status
  status: StudentStatus;
  currentCourse?: string;
  currentYear?: string;
  gradYear?: string;

  // Course Selection
  courses: CourseId[];
  learningMode: LearningMode;
  batchType: BatchType;

  // Collaboration
  studyPartner?: string;

  // Motivation
  message: string;

  // Additional
  referralSource: string;
  consent: boolean;
}