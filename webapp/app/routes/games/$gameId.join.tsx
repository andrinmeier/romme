import { LoaderFunction, useLoaderData } from "remix";
import { AuthenticationService } from "~/services/AuthenticationService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { GameEventType, PlayerJoined } from "game-events";

export const loader: LoaderFunction = async ({
    params,
}) => {
    return params.gameId;
};

const authService = new AuthenticationService();
const JoinGamePage = () => {
    const gameId = useLoaderData();
    const navigate = useNavigate();
    const [user, setUser] = useState("");

    useEffect(() => {
        if (!authService.isAuthenticated()) {
            navigate(`/games/${gameId}/pickaname`);
            return;
        }
        const userInfo = authService.getUserInfo();
        if (userInfo) {
            setUser(userInfo.username);
        }
        const token = authService.getToken();
        const socket = io(`${(window as any).ENV.API_URL!}/games/${gameId}`, {
            auth: {
                token: token
            }
        });
        socket.on("connection", (socket) => {
            console.log("Connected!");
        });
        socket.on("connect_error", (err) => {
            console.log(err.message);
        });
        socket.emit(GameEventType.PLAYER_JOINED.toString(), JSON.stringify(new PlayerJoined("123", "myname")));
        return () => { socket.disconnect(); }
    }, [gameId, navigate]);

    return (
        <div>
            <h1 className="text-red">Hello {user}</h1>
            <h2>Give this link to your friends so they can join:</h2>
            <input className="w-full" value={`https://playromme.com/games/${gameId}/join`} readOnly={true} type="text" />
        </div>
    );
}

export default JoinGamePage;