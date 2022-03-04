import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
  const navigate = useNavigate();

  const startGame = useCallback(() => {
    navigate("/games/new");
  }, [navigate]);

  return (
    <>
      <div className="flex justify-center">
        <h1 className="flex justify-center font-bold text-5xl">Play Rommé in your Browser for free!</h1>
      </div>
      <div className="flex justify-center">
        <button onClick={startGame} className="mt-10 bg-red hover:bg-black hover:border-2 hover:border-red hover:text-red text-black font-bold py-2 px-4 rounded">Start game</button>
      </div>
      <div className="flex justify-center text-2xl mt-10">
        <h2>First time playing?&nbsp;</h2>
        <a target="_blank" rel="noreferrer" href="https://docs.playromme.com/main/stable/how_to_play.html" className="text-red hover:text-white">Learn how to play</a>
      </div>
    </>
  );
}

export default IndexPage;
