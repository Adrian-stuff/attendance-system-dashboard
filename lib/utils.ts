import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ResultData, SectionData } from "./stores/dataStore";
import { AttendanceJson } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// export function processData()
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

interface AttendanceData {
  id: number;
  attendanceStatus: string | null;
  date: string;
  student: Student;
  time: string;
  timeOut: string | null;
}

export function transformAttendanceData(
  inputData: AttendanceData[]
): ResultData[] {
  const result: ResultData[] = [];

  inputData.forEach((entry) => {
    const minute = entry.time.split(":")[1];
    const hour = entry.time.split(":")[0];
    const formattedTime = `${hour}:${minute}`;
    const gradeLevelKey = `Grade ${entry.student.studentGradeLevel.id}`;
    const gradeLevels = ["Grade 11", "Grade 12"];
    const existingEntry = result.find((item) => item.time === formattedTime);

    if (existingEntry) {
      existingEntry.gradeLevel[gradeLevelKey] =
        (existingEntry.gradeLevel[gradeLevelKey] || 0) + 1;
    } else {
      const newItem: ResultData = {
        time: formattedTime,
        gradeLevel: {
          "Grade 11": +(gradeLevelKey === "Grade 11"),
          "Grade 12": +(gradeLevelKey === "Grade 12"),
        },
      };
      result.push(newItem);
    }
  });

  return result;
}
// export

export function transformSocketData(inputData: AttendanceJson[]): ResultData[] {
  const result: ResultData[] = [];

  inputData.forEach((entry) => {
    const minute = entry.time.split(":")[1];
    const hour = entry.time.split(":")[0];
    const formattedTime = `${hour}:${minute}`;
    const gradeLevelKey = `Grade ${entry.student.studentGradeLevel.id}`;

    const existingEntry = result.find((item) => item.time === formattedTime);

    if (existingEntry) {
      existingEntry.gradeLevel[gradeLevelKey] =
        (existingEntry.gradeLevel[gradeLevelKey] || 0) + 1;
    } else {
      const newItem: ResultData = {
        time: formattedTime,
        gradeLevel: { [gradeLevelKey]: 1 },
      };
      result.push(newItem);
    }
  });

  return result;
}
// TODO: check if it works
export function transformSectionData(
  inputData: AttendanceJson[]
): SectionData[] {
  const sectionAttendanceMap: {
    [key: string]: { count: number; gradeLevel: number };
  } = {};

  inputData.forEach(({ student }) => {
    if (!sectionAttendanceMap[student.studentSection.sectionName]) {
      sectionAttendanceMap[student.studentSection.sectionName] = {
        count: 1,
        gradeLevel: student.studentSection.gradeLevel.id,
      };
    } else {
      sectionAttendanceMap[student.studentSection.sectionName].count++;
    }
  });

  const attendanceCounts: SectionData[] = Object.entries(
    sectionAttendanceMap
  ).map(([section, { count, gradeLevel }]) => ({
    section,
    numberOfAttendance: count,
    gradeLevel,
  }));

  return attendanceCounts;
}
