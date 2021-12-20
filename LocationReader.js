const http = require('http');
const fs = require("fs");

const express = require("express");
const app = express();
const server = http.createServer(app);
const Server = require('socket.io');
const get_ip = require("ipware")().get_ip;
const io = new Server(server);

const homePage = fs.readFileSync("./LocationPub/index.html");
const adminPage = fs.readFileSync("./LocationPub/admin.html");

let theIp;

app.get("/", (req, res) => {
  theIp = get_ip(req).clientIp;
  res.send(homePage.toString());
});

app.get("/i!aM@aDm1n", (req, res) => {
  res.send(adminPage.toString());
});

app.get("*", (req, res) => {
  res.send("Page Not Found!!");
});

io.on('connection', socket => {
  socket.on('check', pw => {
    if (pw === "jUst4dmIn!h14") {
      socket.emit('time', theIp);
      return;
    }
    socket.emit('time', 'You Are Not The Admin');
  });
});

server.listen(process.env.PORT);
