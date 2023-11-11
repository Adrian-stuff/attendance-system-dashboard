export interface AttendanceJson {
  message: string;
  time: string;
  studentLrn: number;
  status: string;
  student: Student;
}

export interface Student {
  lrn: number;
  firstName: string;
  middleName: string;
  lastName: string;
  birthdate: string;
  studentGradeLevel: StudentGradeLevel;
  sex: string;
  studentSection: StudentSection;
  guardian: Guardian[];
  address: string;
}

export interface StudentGradeLevel {
  id: number;
  gradeName: string;
}

export interface StudentSection {
  sectionId: number;
  room: number;
  gradeLevel: GradeLevel;
  sectionName: string;
  teacher: Teacher;
}

export interface GradeLevel {
  id: number;
  gradeName: string;
}

export interface Teacher {
  id: number;
  firstName: string;
  middleName: any;
  lastName: string;
}

export interface Guardian {
  id: number;
  fullName: string;
  contactNumber: string;
}
