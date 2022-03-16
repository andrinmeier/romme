import { GameArea } from "./GameArea";
import { ISceneObject } from "./ISceneObject";
import { PerspectiveProjection } from "./PerspectiveProjection";
import { OutsideGameArea } from "./OutsideGameArea";
import { DesktopPlayer } from "./DesktopPlayer";
import { HighDPICanvas } from "./HighDPICanvas";
import { ViewMatrix } from "./ViewMatrix";
import { MobilePlayer } from "./MobilePlayer";
import { ModelMatrix } from "./ModelMatrix";
import { ObjectPosition } from "./ObjectPosition";
import { ObjectColor } from "./ObjectColor";
import { Cube } from "./Cube";

export class RommeGame implements ISceneObject {
    private onScoreChanged: (newScore: number) => void;
    private onGameDone: (finalScore: number) => void;
    private readonly desktopPlayer: DesktopPlayer;
    private readonly mobilePlayer: MobilePlayer;
    private readonly viewMatrix: ViewMatrix;
    private readonly projection: PerspectiveProjection;
    private readonly outsideGame: OutsideGameArea;
    private readonly highDPICanvas: HighDPICanvas;
    private readonly gameArea: GameArea;
    private readonly cube: Cube;

    constructor(
        context: WebGL2RenderingContext,
        shaderProgram: WebGLProgram,
        private readonly canvas: HTMLCanvasElement
    ) {
        this.viewMatrix = new ViewMatrix(context, shaderProgram);
        this.projection = new PerspectiveProjection(context, shaderProgram);
        this.highDPICanvas = new HighDPICanvas(this.canvas);
        const initialFoodRadius = 5;
        this.gameArea = new GameArea(
            this.highDPICanvas.getLogicalWidth(),
            this.highDPICanvas.getLogicalHeight(),
            8 * initialFoodRadius
        );
        this.outsideGame = new OutsideGameArea(
            this.highDPICanvas.getLogicalWidth(),
            this.highDPICanvas.getLogicalHeight()
        );
        this.desktopPlayer = new DesktopPlayer();
        this.mobilePlayer = new MobilePlayer(canvas);
        this.cube = new Cube(context, shaderProgram);
    }

    switchToLowerQuality(): void {
        this.highDPICanvas.disableHighDPI();
    }

    cleanup() {
        this.desktopPlayer.cleanup();
        this.mobilePlayer.cleanup();
        this.highDPICanvas.cleanup();
    }

    update(): void {
        this.highDPICanvas.recalculate();
        this.gameArea.resize(
            this.highDPICanvas.getLogicalWidth(),
            this.highDPICanvas.getLogicalHeight()
        );
        this.outsideGame.resize(
            this.highDPICanvas.getLogicalWidth(),
            this.highDPICanvas.getLogicalHeight()
        );
    }

    draw(lagFix: number): void {
        this.highDPICanvas.recalculate();
        this.gameArea.resize(
            this.highDPICanvas.getLogicalWidth(),
            this.highDPICanvas.getLogicalHeight()
        );
        this.outsideGame.resize(
            this.highDPICanvas.getLogicalWidth(),
            this.highDPICanvas.getLogicalHeight()
        );
        this.setCamera();
        this.cube.draw();
    }

    private setCamera() {
        const width = this.highDPICanvas.getLogicalWidth();
        const height = this.highDPICanvas.getLogicalHeight();
        this.viewMatrix.setValues(
            [width / 2, height / 2, 5],
            [width / 2, height / 2, 0],
            [0, 1, 0]
        );
        this.projection.setValues(
            -width / 2,
            width / 2,
            -height / 2,
            height / 2,
            5,
            256 + 5
        );
    }

    registerOnScoreChanged(callback: (newScore: number) => void) {
        this.onScoreChanged = callback;
    }

    registerOnGameDone(callback: (finalScore: number) => void) {
        this.onGameDone = callback;
    }
}
