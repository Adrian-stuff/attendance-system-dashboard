"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import RealtimeData from "@/components/ui/RealtimeData";
import { ResultData, useAttendanceStore } from "@/lib/stores/dataStore";
import StudentsPresent from "@/components/ui/StudentsPresent";
import {
  getRandomNumber,
  transformAttendanceData,
  transformSocketData,
} from "@/lib/utils";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { socketURL } from "@/lib/socket";
import { getData } from "./data";

export default function Dashboard() {
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketURL);
  const tempMsg = useRef("");
  const [count, setCount] = useState(11);
  const {
    attendance,
    setInitialAttendance,
    addAttendance,
    sections,
    updateSectionAttendance,
  } = useAttendanceStore();

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    if (lastMessage !== null) {
      if (lastMessage.data !== tempMsg.current) {
        console.log(JSON.parse(lastMessage.data));
        const data = JSON.parse(lastMessage.data);
        const updateAttendance = transformSocketData([data]);
        addAttendance(updateAttendance[0], data);
        tempMsg.current = lastMessage.data;
      }
    }
  }, [lastMessage]);

  return (
    <div>
      <RealtimeData></RealtimeData>
      <div className="grid  px-10 gap-2 pt-2">
        {/* <h1>{connectionStatus}</h1> */}
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
      </div>
      <div>
        {/* <Button
          onClick={() => {
            addAttendance({
              time: `${count + 1}:${
                Math.floor(Math.random() * (59 - 1 + 1)) + 1
              }`,
              gradeLevel: {
                "Grade 11": Math.floor(Math.random() * (50 - 1 + 1)) + 1,
                "Grade 12": Math.floor(Math.random() * (50 - 1 + 1)) + 1,
              },
            });
            setCount((state) => state + 1);
          }}
        >
          Click
        </Button> */}
        {/* <Button
          onClick={() => {
            updateSectionAttendance(
              sections[getRandomNumber(0, sections.length - 1)].section,
              getRandomNumber(11, 12),

              getRandomNumber(10, 60)
            );
          }}
        >
          Add Section Attendance
        </Button> */}
      </div>
    </div>
  );
}
