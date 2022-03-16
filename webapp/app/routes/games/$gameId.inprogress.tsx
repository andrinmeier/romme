import { useEffect, useRef } from "react";
import { Game } from "game-webgl";

let game: Game;
const GameScorePage = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current as any;
        const context = canvas.getContext("webgl2");
        game = new Game(context, canvas);
        game.start();
    }, [canvasRef]);

    return <canvas ref={canvasRef} id="romme-canvas" className="w-3/4" />;
};

export default GameScorePage;
