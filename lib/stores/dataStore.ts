import { create } from "zustand";
import { AttendanceJson } from "../types";
import { transformSectionData } from "../utils";

export interface GradeLevelData {
  [grade: string]: number;
}

export interface ResultData {
  time: string;
  gradeLevel: GradeLevelData;
}
export type SectionData = {
  section: string;
  numberOfAttendance: number;
  gradeLevel: number;
};
interface DataState {
  attendance: ResultData[];
  sections: SectionData[];
  totalAttendance: AttendanceJson[];
  setInitialAttendance: (
    attendances: ResultData[],
    attendanceJson: AttendanceJson[]
  ) => void;
  updateSectionAttendance: (
    section: string,
    gradeLevel: number,
    count: number
  ) => void;

  addAttendance: (
    attendance: ResultData,
    attendanceJson: AttendanceJson
  ) => void;
}
export const useAttendanceStore = create<DataState>((set) => ({
  attendance: [
    { time: "09:00", gradeLevel: { "Grade 11": 5, "Grade 12": 8 } },
    { time: "09:15", gradeLevel: { "Grade 11": 7, "Grade 12": 6 } },
    { time: "09:30", gradeLevel: { "Grade 11": 4, "Grade 12": 9 } },
    { time: "10:00", gradeLevel: { "Grade 11": 3, "Grade 12": 10 } },
    { time: "10:15", gradeLevel: { "Grade 11": 6, "Grade 12": 7 } },
    { time: "10:30", gradeLevel: { "Grade 11": 8, "Grade 12": 5 } },
    { time: "11:00", gradeLevel: { "Grade 11": 4, "Grade 12": 9 } },
  ],
  totalAttendance: [],

  sections: [
    { section: "Diosdado Banatao", numberOfAttendance: 5, gradeLevel: 11 },
    { section: "Casimiro Del Rosario", numberOfAttendance: 5, gradeLevel: 11 },
    { section: "Gregorio Zara", numberOfAttendance: 5, gradeLevel: 11 },
    { section: "Marie Curie", numberOfAttendance: 5, gradeLevel: 12 },
    { section: "Isaac Newton", numberOfAttendance: 5, gradeLevel: 12 },
    { section: "Albert Einstein", numberOfAttendance: 5, gradeLevel: 12 },
    { section: "Charles Flint", numberOfAttendance: 5, gradeLevel: 12 },
  ],
  setInitialAttendance: async (attendances, attendanceJson) =>
    set((state) => {
      return {
        attendance: attendances.sort((a, b) => {
          const timeA = a.time.split(":");
          const timeB = b.time.split(":");

          const hourDiff = +timeA[0] - +timeB[0]; // Compare hours

          if (hourDiff === 0) {
            // If hours are the same, compare minutes
            return +timeA[1] - +timeB[1];
          } else {
            return hourDiff;
          }
        }),
        totalAttendance: [...state.totalAttendance, ...attendanceJson],
        sections: transformSectionData(attendanceJson),
      };
    }),
  updateSectionAttendance: (section, gradeLevel, count) =>
    set((state) => {
      let sectionIndex = state.sections.findIndex(
        (val) => val.section === section
      );

      let copySection = [...state.sections]; // Creating a shallow copy of the state's sections

      if (sectionIndex === -1) {
        copySection.push({
          gradeLevel: gradeLevel,
          numberOfAttendance: count,
          section: section,
        });
      } else {
        copySection[sectionIndex] = {
          ...copySection[sectionIndex],
          numberOfAttendance: count,
        };
      }

      return { sections: copySection };
    }),
  addAttendance: (attendance, attendanceJson) =>
    set((state) => {
      console.log(attendanceJson);
      state.updateSectionAttendance(
        attendanceJson?.student.studentSection.sectionName,
        attendanceJson.student.studentSection.gradeLevel.id,

        (state.sections.find(
          (val) =>
            val.section === attendanceJson.student.studentSection.sectionName
        )?.numberOfAttendance ?? 0) + 1
      );
      // TODO: check if it works
      return {
        attendance: [...state.attendance, attendance].sort((a, b) => {
          const timeA = a.time.split(":");
          const timeB = b.time.split(":");

          const hourDiff = +timeA[0] - +timeB[0]; // Compare hours

          if (hourDiff === 0) {
            // If hours are the same, compare minutes
            return +timeA[1] - +timeB[1];
          } else {
            return hourDiff;
          }
        }),
        // sections: [...state.sections, ...transformSectionData([attendanceJson])],
      };
    }),
}));
