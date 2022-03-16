import { Alignment, Cube, Size, Location, Color } from "./Cube";
import { ISceneObject } from "./ISceneObject";

export class Table implements ISceneObject {
    private size: Size = [5, 5, 1];
    private location: Location = [128, 128, 0];
    constructor(
        private readonly cube: Cube,
        size: Size,
        location: Location,
        private readonly alignment: Alignment,
        private readonly color: Color
    ) {
        this.size = size;
        this.location = location;
    }
    update(): void {
        // Nothing to do here.
    }
    resize(newSize: Size) {
        this.size = newSize;
    }

    move(newLocation: Location) {
        this.location = newLocation;
    }
    draw(lagFix: number): void {
        this.cube.move(this.location);
        this.cube.resize(this.size);
        this.cube.align(this.alignment);
        this.cube.changeColor(this.color);
        this.cube.draw();
    }
}
