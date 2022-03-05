import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderFunction, useLoaderData } from "remix";
import { AuthenticationService } from "~/services/AuthenticationService";

export const loader: LoaderFunction = async ({
    params,
}) => {
    return params.gameId;
};

const authService = new AuthenticationService();
const PickAName = () => {
    const gameId = useLoaderData();
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const onUsernameChange = useCallback((e: any) => {
        setUsername(e.target.value);
    }, []);

    const join = useCallback(() => {
        async function register() {
            await authService.authenticate(username);
            navigate(`/games/${gameId}/join`);
        }
        register();
    }, [username, navigate, gameId]);

    return (
        <div>
            <label className="block text-red text-3xl font-bold mb-2" htmlFor="username">
                Pick a player name:
            </label>
            <input onChange={onUsernameChange} id="username" value={username} type="text" placeholder="Username" />
            <button onClick={join} className="btn">Join</button>
        </div>
    )
}

export default PickAName;