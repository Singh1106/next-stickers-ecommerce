import { Server } from "socket.io";
import auth from "../../src/middleware/auth";
import { NextApiRequestWithUser } from "../../src/types/types";
import User from "../../src/models/user";
import connectDB from "../../src/middleware/connectDB";
import { Socket } from "dgram";

connectDB();

const handler = (req: NextApiRequestWithUser, res: any) => {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }
  let user = req.user;
  const io = new Server(res.socket.server);
  res.socket.server.io = io;
  let roomUser: any;

  const onConnection = (socket: any) => {
    if (!user.isAdmin) {
      socket.join(req.user.email);
    }

    const sendMessageToAdmin = async (msg: string) => {
      user.messagesWithAdmin.push(msg);
      socket
        .to(user.email)
        .emit("newIncomingMessageToAdmin", user.messagesWithAdmin);
      user = await user.save();

      roomUser = await User.findById(roomUser._id); //updatring room user ref as well
    };
    const sendMessageFromAdmin = async (msg: string) => {
      roomUser.messagesWithAdmin.push(msg);
      socket
        .to(roomUser.email)
        .emit("newIncomingMessageFromAdmin", roomUser.messagesWithAdmin);
      // another jugaad, sending all msgs, because apprently sending one message,
      // is not doing the job. dk why.
      roomUser = await roomUser.save();

      user = await User.findById(user._id); // updating user ref as well
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
