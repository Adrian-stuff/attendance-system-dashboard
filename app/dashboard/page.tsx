"use client";

import { AreaChart, BarChart, DonutChart } from "@tremor/react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import RealtimeData from "@/components/ui/RealtimeData";
import { useAttendanceStore } from "@/lib/stores/dataStore";
import StudentsPresent from "@/components/ui/StudentsPresent";
import { getRandomNumber } from "@/lib/utils";
export default function Dashboard() {
  const grade11Data = [
    { section: "BANATAO", "Number of Students": 30 },
    { section: "DEL MUNDO", "Number of Students": 49 }, // You can set the initial number of "Number of Students" here
    { section: "ZARA", "Number of Students": 45 },
    { section: "CASIMIRO", "Number of Students": 23 },
  ];
  const grade12Data = [
    { section: "CURIE", "Number of Students": 30 },
    { section: "EINSTEIN", "Number of Students": 49 }, // You can set the initial number of "Number of Students" here
    { section: "FLINT", "Number of Students": 45 },
    { section: "NEWTON", "Number of Students": 23 },
  ];
  const absentData = [
    { section: "CURIE", absent: 10 },
    { section: "NEWTON", absent: 14 },
    { section: "FLINT", absent: 5 },
    { section: "EINSTEIN", absent: 9 },
  ];
  const { attendance, addAttendance, sections, updateSectionAttendance } =
    useAttendanceStore();

  return (
    <div className="grid grid-cols-2 px-10 gap-10 pt-2">
      <RealtimeData></RealtimeData>
      {/* <Card className=" w-lg">
        <CardHeader>
          <CardTitle> Absents per section</CardTitle>
          <CardDescription>Grade 12</CardDescription>
        </CardHeader>
        <div className="px-10">
          <DonutChart
            className="mt-6 h-72 w-lg "
            data={absentData}
            index="section"
            category={"absent"}
            colors={["violet", "rose", "blue", "green"]}
          ></DonutChart>
        </div>
      </Card> */}
      <StudentsPresent gradeLevel="11"></StudentsPresent>
      <StudentsPresent gradeLevel="12"></StudentsPresent>

      <div>
        <Button
          onClick={() =>
            addAttendance({
              time: `${Math.floor(Math.random() * (12 - 1 + 1)) + 1}:${
                Math.floor(Math.random() * (59 - 1 + 1)) + 1
              }`,
              "Grade 11": Math.floor(Math.random() * (50 - 1 + 1)) + 1,
              "Grade 12": Math.floor(Math.random() * (50 - 1 + 1)) + 1,
            })
          }
        >
          Click
        </Button>
        <Button
          onClick={() => {
            updateSectionAttendance(
              sections[getRandomNumber(0, sections.length - 1)].section,
              getRandomNumber(10, 60)
            );
          }}
        >
          Add Section Attendance
        </Button>
      </div>
    </div>
  );
}
