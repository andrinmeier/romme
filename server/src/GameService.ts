import { Path, POST } from "typescript-rest";
import { v4 as uuidv4, parse as uuidParse } from 'uuid';
import { GameCreatedResponse } from "./GameCreatedResponse";

@Path("/games")
export class GameService {
    @POST
    createGame(): GameCreatedResponse {
        const response = new GameCreatedResponse();
        response.gameId = uuidv4();
        return response;
    }
}