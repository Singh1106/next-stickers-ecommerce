import { Server } from "socket.io";
import auth from "../../src/middleware/auth";
import { NextApiRequestWithUser } from "../../src/types/types";
import User from "../../src/models/user";
import connectDB from "../../src/middleware/connectDB";

connectDB();

const handler = (req: NextApiRequestWithUser, res: any) => {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }
  const user = req.user;
  const io = new Server(res.socket.server);
  res.socket.server.io = io;
  const sendMessageToAdmin = async (msg: string) => {
    user.messagesWithAdmin.push(msg);
    await user.save();
  };
  const sendMessageFromAdmin = async (msg: string) => {
    // io.to(req.user.email).emit("newIncommingMessageFromAdmin");
  };
  const onConnection = (socket: any) => {
    socket.join(req.user.email);

    socket.on("sendMessageFromAdmin", sendMessageFromAdmin);
    socket.on("sendMessageToAdmin", sendMessageToAdmin);
  };

  // Define actions inside
  io.on("connection", onConnection);

  console.log("Setting up socket");
  res.end();
};

export default auth(handler);
