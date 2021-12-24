let userCon = [];

const socketIo = (io) => {
  io.on("connection", (socket) => {
    console.log("client connect id:", socket.id);
    userCon.push(socket.id);

    console.log(userCon.length);

    socket.on("disconnect", () => {
      console.log("client disconnect");
    });
  });
};

module.exports = socketIo;
