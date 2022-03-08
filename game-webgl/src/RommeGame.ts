import { ISceneObject } from "./ISceneObject";
import { DesktopPlayer } from "./DesktopPlayer";
import { HighDPICanvas } from "./HighDPICanvas";
import { ViewMatrix } from "./ViewMatrix";

export class RommeGame implements ISceneObject {
    private readonly desktopPlayer: DesktopPlayer;
    private readonly viewMatrix: ViewMatrix;
    private readonly highDPICanvas: HighDPICanvas;

    constructor(
        context: any,
        shaderProgram: any,
        private readonly canvas: any
    ) {
        this.viewMatrix = new ViewMatrix(context, shaderProgram);
        this.highDPICanvas = new HighDPICanvas(this.canvas);
        this.desktopPlayer = new DesktopPlayer();
    }

    switchToLowerQuality(): void {
        this.highDPICanvas.disableHighDPI();
    }

    cleanup() {
        this.desktopPlayer.cleanup();
        this.highDPICanvas.cleanup();
    }

    update(): void {
        this.highDPICanvas.recalculate();
    }

    draw(lagFix: number): void {
        this.highDPICanvas.recalculate();
        this.setCamera();
    }

    private setCamera() {
        const width = this.highDPICanvas.getLogicalWidth();
        const height = this.highDPICanvas.getLogicalHeight();
        this.viewMatrix.setValues(
            [width / 2, height / 2, 5],
            [width / 2, height / 2, 0],
            [0, 1, 0]
        );
    }
}
