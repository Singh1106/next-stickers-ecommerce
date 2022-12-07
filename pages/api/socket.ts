import { NextApiResponse } from "next";
import { Server } from "socket.io";
import auth from "../../src/middleware/auth";
import { NextApiRequestWithUser } from "../../src/types/types";
import messageHandler from "../../src/utils/sockets/messageHandler";

const handler = (req: NextApiRequestWithUser, res: any) => {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  const onConnection = (socket: any) => {
    messageHandler(io, socket);
  };

  // Define actions inside
  io.on("connection", onConnection);

  console.log("Setting up socket");
  res.end();
};

export default auth(handler);
