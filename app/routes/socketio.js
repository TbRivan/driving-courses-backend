module.exports = (io) => {
  const { verifyJwt } = require("./app/helper/jwt");

  io.use((socket, next) => {
    const token = socket.handshake.query.t;

    if (!token) {
      return next(new Error("Authentication error"));
    }

    const user = verifyJwt(token);

    socket.user = user.decoded;

    next();
  });

  io.on("connection", (socket) => {
    socket.on("admin", (data) => {
      if (socket.user.role !== 1) {
        return socket.disconnect();
      }
    });

    socket.on("user", (data) => {
      const userId = socket.user.id;
      if (!userId) {
        return socket.emit("error", "User ID not found");
      }
    });

    socket.on("disconnect", () => {});
  });
};
