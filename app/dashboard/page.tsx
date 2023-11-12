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
import StudentsTable from "@/components/StudentsTable";

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
    <div className="flex flex-col justify-center items-center ">
      <div className="w-full px-10 mt-5">
        <RealtimeData></RealtimeData>
      </div>
      <div className="grid lg:grid-cols-2 lg:px-10 px-2 gap-2 pt-2 w-full">
        {/* <h1>{connectionStatus}</h1> */}

        <StudentsPresent gradeLevel="11"></StudentsPresent>
        <StudentsPresent gradeLevel="12"></StudentsPresent>
      </div>
      <div className="w-full px-10 my-5 ">
        <StudentsTable></StudentsTable>
      </div>
    </div>
  );
}
