require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./src/modules/redis");
// port
const port = 5000;
const router = require("./src/routes");

app.use(express.json());
app.use(cors());

// socket io
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: process.env.CLIENT_URL,
});

require("./src/socket")(io);
// socket oi end

app.use("/uploads", express.static("uploads"));

app.use("/api/v1/", router);

server.listen(port, () => console.log(`listen on port ${port}`));
