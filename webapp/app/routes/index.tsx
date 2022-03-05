import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GameService } from "~/services/GameService";

const IndexPage = () => {
  const navigate = useNavigate();

  const startGame = useCallback(() => {
    async function startGame() {
      const gameService = new GameService();
      const gameId = await gameService.createGame();
      navigate(`/games/${gameId}/join`);
    }
    startGame();
  }, [navigate]);

  return (
    <>
      <div className="flex justify-center">
        <h1 className="flex justify-center font-bold text-5xl">Play Rommé in your Browser for free!</h1>
      </div>
      <div className="flex justify-center">
        <button onClick={startGame} className="btn mt-10">Start game</button>
      </div>
      <div className="flex justify-center text-2xl mt-10">
        <h2>First time playing?&nbsp;</h2>
        <a target="_blank" rel="noreferrer" href="https://docs.playromme.com/main/stable/how_to_play.html" className="link">Learn how to play</a>
      </div>
    </>
  );
}

export default IndexPage;
