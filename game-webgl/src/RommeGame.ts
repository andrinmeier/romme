import { ISceneObject } from "./ISceneObject";
import { PerspectiveProjection } from "./PerspectiveProjection";
import { DesktopPlayer } from "./DesktopPlayer";
import { HighDPICanvas } from "./HighDPICanvas";
import { ViewMatrix } from "./ViewMatrix";
import { MobilePlayer } from "./MobilePlayer";
import { ModelMatrix } from "./ModelMatrix";
import { ObjectPosition } from "./ObjectPosition";
import { ObjectColor } from "./ObjectColor";
import { Cube } from "./Cube";
import { Room } from "./Room";

export class RommeGame implements ISceneObject {
    private onScoreChanged: (newScore: number) => void;
    private onGameDone: (finalScore: number) => void;
    private readonly desktopPlayer: DesktopPlayer;
    private readonly mobilePlayer: MobilePlayer;
    private readonly viewMatrix: ViewMatrix;
    private readonly projection: PerspectiveProjection;
    private readonly highDPICanvas: HighDPICanvas;
    private readonly room: Room;

    constructor(
        context: WebGL2RenderingContext,
        shaderProgram: WebGLProgram,
        private readonly canvas: HTMLCanvasElement
    ) {
        this.viewMatrix = new ViewMatrix(context, shaderProgram);
        this.projection = new PerspectiveProjection(context, shaderProgram);
        this.highDPICanvas = new HighDPICanvas(this.canvas);
        this.desktopPlayer = new DesktopPlayer();
        this.mobilePlayer = new MobilePlayer(canvas);
        const cube = new Cube(context, shaderProgram);
        this.room = new Room(cube);
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
        this.room.update();
    }

    draw(lagFix: number): void {
        this.highDPICanvas.recalculate();
        this.setCamera();
        this.room.draw(lagFix);
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
