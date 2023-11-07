import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./card";
import { BarChart } from "@tremor/react";
import { SectionData, useAttendanceStore } from "@/lib/stores/dataStore";

const StudentsPresent = ({ gradeLevel }: { gradeLevel: "11" | "12" }) => {
  const { sections } = useAttendanceStore();
  const [data, setData] = useState<
    { section: string; "Present Students": number }[]
  >([]);
  useEffect(() => {
    const tempData = sections.filter((a) => a.gradeLevel == +gradeLevel);
    console.log("tempData", tempData);
    const newData = tempData.map((data) => ({
      section: data.section,
      "Present Students": data.numberOfAttendance,
    }));
    setData(newData);
    useAttendanceStore.subscribe((state, prevState) => {
      console.log(state.sections);
      let sectionData = state.sections;
      const tempData = sectionData.filter((a) => a.gradeLevel == +gradeLevel);
      console.log("tempData", tempData);
      const newData = tempData.map((data) => ({
        section: data.section,
        "Present Students": data.numberOfAttendance,
      }));
      console.log("newData", newData);
      setData(newData);
    });
  }, []);

  return (
    <Card className="w-lg">
      <CardHeader>
        <CardTitle>Present Students per section</CardTitle>
        <CardDescription>Grade {gradeLevel}</CardDescription>
      </CardHeader>
      <div className="px-10">
        <BarChart
          className="mt-6 h-72 w-lg "
          data={data}
          index="section"
          categories={["Present Students"]}
          yAxisWidth={48}
        ></BarChart>
      </div>
    </Card>
  );
};

export default StudentsPresent;
