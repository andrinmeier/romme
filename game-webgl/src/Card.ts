import { Alignment, Cube, Size, Location, Color } from "./Cube";
import { ISceneObject } from "./ISceneObject";
import { Plane } from "./Plane";

export class Card implements ISceneObject {
    private size: Size = [5, 10, 1];
    private location: Location = [128, 128, 0];
    private frontColor: Color;
    private isSelected = false;
    constructor(
        private readonly cube: Cube,
        size: Size,
        location: Location,
        private readonly alignment: Alignment
    ) {
        this.size = size;
        this.location = location;
        this.frontColor = [0.8, 0.8, 0.8];
    }

    select() {
        this.isSelected = true;
    }

    deselect() {
        this.isSelected = false;
    }

    update(): void {
        // Nothing to do here.
    }

    resize(newSize: Size) {
        this.size = newSize;
    }

    getFrontPlane(): Plane {
        return this.cube.getFrontPlane();
    }

    move(newLocation: Location) {
        this.location = newLocation;
    }

    draw(lagFix: number): void {
        this.cube.move(this.location);
        this.cube.resize(this.size);
        this.cube.align(this.alignment);
        let frontColor = this.frontColor;
        if (this.isSelected) {
            frontColor = [1, 1, 1];
        }
        this.cube.changeColors(
            [0, 0, 0],
            frontColor,
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1]
        );
        this.cube.draw();
    }
}
