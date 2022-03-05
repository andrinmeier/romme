import axios from "axios";

export class GameService {
    async createGame(): Promise<string> {
        let url = "";
        try {
            url = process.env.API_URL!;
        } catch {
            url = "http://localhost:8080";
        }
        const response = await axios.post(url + "/games");
        return response.data.gameId;
    }
}