// "undefined" means the URL will be computed from the `window.location` object
export const socketURL =
  process.env.NEXT_PUBLIC_WEBSOCKET_URL ?? "http://localhost:4000";
console.log(socketURL);
