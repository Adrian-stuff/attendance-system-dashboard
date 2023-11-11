import axios from "axios";

export async function GET(request: Request) {
  const SERVER_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_SERVER_PORT}`;
  console.log(SERVER_URL);
  const res = await axios.get(
    `${SERVER_URL}/api/v1/attendance/statistics/today`,
    {
      headers: {
        Authorization: "Basic cHJpbmNpcGFsOjEyMzQ=",
      },
    }
  );
  const data = res.data;
  console.log(data);
  return Response.json(data);
}
