import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AreaChart } from "@tremor/react";
import { useAttendanceStore } from "@/lib/stores/dataStore";
const RealtimeData = () => {
  const { attendance, addAttendance } = useAttendanceStore();
  return (
    <>
      <Card className="w-lg">
        <CardHeader>
          <CardTitle>Realtime Data</CardTitle>
        </CardHeader>
        <div className="px-5">
          <AreaChart
            className="h-72 w-lg mt-4 "
            data={attendance}
            index="time"
            categories={["Grade 11", "Grade 12"]}
            colors={["green", "yellow"]}
          ></AreaChart>
        </div>
      </Card>
    </>
  );
};

export default RealtimeData;
