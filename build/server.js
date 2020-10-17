"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _bodyparser = require('body-parser'); var _bodyparser2 = _interopRequireDefault(_bodyparser);
var _socketio = require('socket.io'); var _socketio2 = _interopRequireDefault(_socketio);
var _path = require('path');

const app = _express2.default.call(void 0, );

_mongoose2.default.connect(
  "mongodb+srv://guilherme:pZeB8XSZovy0AKE0@cluster0.twtkw.mongodb.net/colegiomedicina?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

app.use("/storage", _express2.default.static(_path.resolve.call(void 0, __dirname, "..", "storage")));

app.use(_bodyparser2.default.json());

app.use(_routes2.default);

const server = app.listen(process.env.PORT || 3333, () => {
  console.log("Online!");
});

const io = _socketio2.default.call(void 0, server);
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
