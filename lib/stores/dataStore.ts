import { create } from "zustand";

type Attendance = { time: string; "Grade 11": number; "Grade 12": number };
export type SectionData = {
  section: string;
  numberOfAttendance: number;
  gradeLevel: number;
};
interface DataState {
  attendance: Attendance[];
  sections: SectionData[];
  updateSectionAttendance: (section: string, count: number) => void;

  addAttendance: (attendance: Attendance) => void;
}
export const useAttendanceStore = create<DataState>((set) => ({
  attendance: [
    { time: "09:00", "Grade 11": 5, "Grade 12": 8 },
    { time: "09:15", "Grade 11": 7, "Grade 12": 6 },
    { time: "09:30", "Grade 11": 4, "Grade 12": 9 },
    { time: "10:00", "Grade 11": 3, "Grade 12": 10 },
    { time: "10:15", "Grade 11": 6, "Grade 12": 7 },
    { time: "10:30", "Grade 11": 8, "Grade 12": 5 },
    { time: "11:00", "Grade 11": 4, "Grade 12": 9 },
  ],

  sections: [
    { section: "Diosdado Banatao", numberOfAttendance: 5, gradeLevel: 11 },
    { section: "Casimiro Del Rosario", numberOfAttendance: 5, gradeLevel: 11 },
    { section: "Gregorio Zara", numberOfAttendance: 5, gradeLevel: 11 },
    { section: "Marie Curie", numberOfAttendance: 5, gradeLevel: 12 },
    { section: "Isaac Newton", numberOfAttendance: 5, gradeLevel: 12 },
    { section: "Albert Einstein", numberOfAttendance: 5, gradeLevel: 12 },
    { section: "Charles Flint", numberOfAttendance: 5, gradeLevel: 12 },
  ],
  updateSectionAttendance: (section, count) =>
    set((state) => {
      let sectionIndex = state.sections.findIndex(
        (val) => val.section === section
      );

      // let copySection = state.sections.copyWithin(-1, 0, state.sections.length);
      let copySection = state.sections;
      copySection[sectionIndex].numberOfAttendance = count;
      console.log("hello");
      return { sections: copySection };
    }),
  addAttendance: (attendance) =>
    set((state) => ({
      attendance: [...state.attendance, attendance].sort(
        (a, b) => +a.time.split(":")[0] - +b.time.split(":")[0]
      ),
    })),
}));
