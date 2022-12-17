import { Server } from "socket.io";
import auth from "../../src/middleware/auth";
import { NextApiRequestWithUser } from "../../src/types/types";
import User from "../../src/models/user";
import connectDB from "../../src/middleware/connectDB";
import { Server as NetServer } from "http";
connectDB();

const handler = (req: NextApiRequestWithUser, res: any) => {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }
  let user = req.user;
  const httpServer: NetServer = res.socket.server as any;
  const io = new Server(httpServer, {
    path: "/api/socket",
  });
  res.socket.server.io = io;
  let roomUser: any;

  const onConnection = (socket: any) => {
    if (!req.user.isAdmin) {
      console.log(req.user.email);
      socket.join(req.user.email);
    }

    const sendMessageToAdmin = async (msg: string) => {
      console.log(socket.rooms);
      user.messagesWithAdmin.push(msg);
      socket
        .to(user.email)
        .emit("newIncomingMessageToAdmin", user.messagesWithAdmin);
      user = await user.save();
    };
    const sendMessageFromAdmin = async (msg: string) => {
      console.log(socket.rooms);

      roomUser.messagesWithAdmin.push(msg);
      socket
        .to(roomUser.email)
        .emit("newIncomingMessageFromAdmin", roomUser.messagesWithAdmin);
      // another jugaad, sending all msgs, because apprently sending one message,
      // is not doing the job. dk why.
      roomUser = await roomUser.save();
    };
    const chooseUserRoom = async (id: string) => {
      roomUser = await User.findById(id);
      socket.join(roomUser.email);
      console.log(roomUser.email);
    };
    socket.on("chooseUserRoom", chooseUserRoom);
    socket.on("sendMessageFromAdmin", sendMessageFromAdmin);
    socket.on("sendMessageToAdmin", sendMessageToAdmin);
  };

  // Define actions inside
  io.on("connection", onConnection);

  console.log("Setting up socket");
  res.end();
};

export default auth(handler);
