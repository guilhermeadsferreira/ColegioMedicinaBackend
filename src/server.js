import express from "express";
import routes from "./routes";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import socket from "socket.io";
import { MOCK_TOKEN } from "./consts";

const app = express();

mongoose.connect(
  "mongodb+srv://guilherme:pZeB8XSZovy0AKE0@cluster0.twtkw.mongodb.net/colegiomedicina?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

app.use(bodyParser.json());

app.use(routes);

const server = app.listen(process.env.PORT || 3333, () => {
  console.log("Online!");
});

const io = socket(server);
// const activeUsers = new Set();

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("new user", function (data) {
    socket.userId = data;
    // activeUsers.add(data);
    io.emit("new user", `${data} entrou no chat.`);
  });

  socket.on("disconnect", () => {
    // activeUsers.delete(socket.userId);
    io.emit("user disconnected", `${socket.userId} saiu do chat.`);
  });

  socket.on("chat message", function (data) {
    io.emit("chat message", data);
  });

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
