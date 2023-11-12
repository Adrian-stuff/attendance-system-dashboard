export interface AttendanceJson {
  id: number;
  attendanceStatus: string;
  date: string;
  time: string;
  timeOut: any;
  student: Student;
  section: Section;
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
  strand: Strand;
}

export interface GradeLevel {
  id: number;
  gradeName: string;
}

export interface Teacher {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface Strand {
  id: number;
  strandName: string;
}

export interface Guardian {
  id: number;
  fullName: string;
  contactNumber: string;
}

export interface Section {
  sectionId: number;
  room: number;
  gradeLevel: GradeLevel2;
  sectionName: string;
  teacher: Teacher2;
  strand: Strand2;
}

export interface GradeLevel2 {
  id: number;
  gradeName: string;
}

export interface Teacher2 {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface Strand2 {
  id: number;
  strandName: string;
}
