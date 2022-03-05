import express from "express";
import { Server } from "typescript-rest";
import { AuthenticationService } from "./AuthenticationService";
import { GameService } from "./GameService";
import cors from "cors";
import { Server as SocketServer } from 'socket.io';
import jwt from 'jsonwebtoken';
import { GameEventType, PlayerJoined } from "game-events";

let app: express.Application = express();
app.use(cors());
Server.buildServices(app, AuthenticationService, GameService);

const port = process.env.port || 8080;
const server = app.listen(Number(port), '0.0.0.0', function () {
    console.log('Rest Server listening on port ' + port);
});
const io = new SocketServer(server, {
    cors: {
        origin: "*"
    }
});
const parent = io.of((name, auth, next) => {
    // TODO: Check if game id is valid
    next(null, true); // or false, when the creation is denied
});
parent.use(function (socket, next) {
    if (socket.handshake.auth && socket.handshake.auth.token) {
        jwt.verify(socket.handshake.auth.token, process.env.ROMME_JWT_SECRET_KEY, function (err, decoded) {
            if (err) {
                return next(new Error('Authentication error'));
            }
            socket.data = decoded;
            next();
        });
    }
    else {
        next(new Error('Authentication error'));
    }
});

parent.on("connection", (socket) => {
    console.log("Connected!");
    socket.on(GameEventType.PLAYER_JOINED.toString(), (event: PlayerJoined) => {
        console.log({ event });
    });
});