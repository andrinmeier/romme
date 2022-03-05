import { LoaderFunction, useLoaderData } from "remix";
import { AuthenticationService } from "~/services/AuthenticationService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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