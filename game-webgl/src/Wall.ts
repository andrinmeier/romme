import { Alignment, Cube, Size, Location, Color } from "./Cube";
import { ISceneObject } from "./ISceneObject";

export class Wall implements ISceneObject {
    constructor(
        private readonly cube: Cube,
        private readonly size: Size,
        private readonly location: Location,
        private readonly alignment: Alignment,
        private readonly color: Color
    ) {}
    update(): void {
        // Nothing to do here.
    }
    draw(lagFix: number): void {
        this.cube.move(this.location);
        this.cube.resize(this.size);
        this.cube.align(this.alignment);
        this.cube.changeColor(this.color);
        this.cube.draw();
    }
}
