export type StatusType = "idle" | "pending" | "success" | "failure";

export type HttpMethodType = "PUT" | "GET" | "POST" | "DELETE";

export interface SemesterType {
  semester_number: number;
  year: number;
  id: number;
}

export interface CourseType {
  course_code: string;
  course_name: string;
  semesters: number[];
  id: number;
}

export interface LecturerType {
  user: string;
  staff_ID: string;
  first_name: string;
  last_name: string;
  email: string;
  courses: string;
  dob: string;
  id: number;
}

export interface ClassroomType {
  classroom_number: string;
  semester: string;
  course: string;
  lecturer: string;
  id: number;
}

export interface StudentType {
  user: string;
  student_ID: string;
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  id: number;
}

export interface StudentEnrollmentType {
  student_ID: string;
  class_enrolled: string;
  grade: string;
  enroll_time: string;
  grade_time: string;
  id: number;
}
