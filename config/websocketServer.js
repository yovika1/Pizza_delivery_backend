// import { Server } from "socket.io";

// let io; 

// export const WebSocket = (server) => {
//     io = new Server(server, {
//     cors: {
//       origin: "*",
//     },
//   });

//   io.on("connect", (socket) => {
//     console.log("user connected", socket.id);

//     socket.on('disconnect',() =>{
//       console.log("user disconnected", socket.id)
//     });
//   });
// };

// export {io};