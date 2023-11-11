import React, { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AreaChart } from "@tremor/react";
import { useAttendanceStore } from "@/lib/stores/dataStore";
import { getData } from "@/app/dashboard/data";
const RealtimeData = () => {
  const { attendance, setInitialAttendance } = useAttendanceStore();
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    getData().then((data) => {
      // TODO: check if it works
      setInitialAttendance(data.attendances, data.attendanceJson);
      console.log("hello");
      console.log(data.attendances);
      setIsReady(true);
    });
  }, []);
  const data = attendance.map((val) => ({
    time: val.time,
    "Grade 11": val.gradeLevel["Grade 11"],
    "Grade 12": val.gradeLevel["Grade 12"],
  }));
  return (
    <>
      {isReady ? (
        <Card className="w-lg">
          <CardHeader>
            <CardTitle>Realtime Data</CardTitle>
          </CardHeader>
          <div className="px-5">
            <AreaChart
              className="h-72 w-lg mt-4 "
              data={data}
              index="time"
              categories={["Grade 11", "Grade 12"]}
              colors={["green", "blue"]}
            ></AreaChart>
          </div>
        </Card>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default RealtimeData;
