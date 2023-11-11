import { transformAttendanceData } from "@/lib/utils";
import { getInitialAttendance } from "../data";
export async function getData() {
  const data = await getInitialAttendance();

  const transformedData = transformAttendanceData(data);
  return { attendances: transformedData, attendanceJson: data };
}
