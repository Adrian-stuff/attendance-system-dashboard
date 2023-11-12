import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAttendanceStore } from "@/lib/stores/dataStore";
import { AttendanceJson } from "@/lib/types";
const StudentsTable = () => {
  const { totalAttendance } = useAttendanceStore();
  // useEffect(() => {
  //   console.log(Array.from(new Set(totalAttendance)));
  //   console.log(totalAttendance);
  // }, [totalAttendance]);
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>LRN</TableHead>
            <TableHead className="">Grade/Section</TableHead>
            <TableHead className="">Adviser</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from(
            new Set(totalAttendance.map((item) => JSON.stringify(item)))
          )
            .map((item) => JSON.parse(item) as AttendanceJson)
            .sort((a, b) => {
              const timeA = a.time.split(":");
              const timeB = b.time.split(":");

              const hourDiff = +timeA[0] - +timeB[0]; // Compare hours

              if (hourDiff === 0) {
                // If hours are the same, compare minutes
                return +timeA[1] + +timeB[1];
              } else {
                return hourDiff;
              }
            })
            .slice(0, 7)
            .map((val, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{val.time}</TableCell>

                  <TableCell>{val.attendanceStatus}</TableCell>
                  <TableCell>
                    {val.student.lastName}, {val.student.firstName}{" "}
                    {val.student.middleName}
                  </TableCell>

                  <TableCell>{val.student.lrn}</TableCell>
                  <TableCell className="">
                    {val.student.studentSection.gradeLevel.id} -{" "}
                    {val.student.studentSection.sectionName}
                  </TableCell>
                  <TableCell className="">
                    {val.student.studentSection.teacher.lastName}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentsTable;
