const SERVER_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_SERVER_PORT}`;
import axios from "axios";
export async function getInitialAttendance() {
  const res = await axios.get(`/api/initialAttendance`, {});
  const data = res.data;
  return data;
}
