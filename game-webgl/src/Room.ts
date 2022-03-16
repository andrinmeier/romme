import { Angle } from "./Angle";
import { Cube } from "./Cube";
import { ISceneObject } from "./ISceneObject";
import { Wall } from "./Wall";

export class Room implements ISceneObject {
    private readonly leftWall: Wall;
    private readonly rightWall: Wall;
    private readonly frontWall: Wall;
    private readonly ceiling: Wall;
    private readonly floor: Wall;
    constructor(private readonly cube: Cube) {
        this.leftWall = new Wall(
            cube,
            [256, 256, 1],
            [0, 0, 0],
            [Angle.fromDegrees(90), [0, 1, 0]],
            [1.0, 0, 0]
        );
        this.rightWall = new Wall(
            cube,
            [256, 256, 1],
            [256, 0, -256],
            [Angle.fromDegrees(-90), [0, 1, 0]],
            [1.0, 1.0, 0]
        );
        this.frontWall = new Wall(
            cube,
            [256, 256, 1],
            [0, 0, -256],
            [Angle.fromDegrees(0), [0, 0, 0]],
            [1.0, 0, 1.0]
        );
        this.ceiling = new Wall(
            cube,
            [256, 256, 1],
            [0, 256, -256],
            [Angle.fromDegrees(90), [1, 0, 0]],
            [1.0, 0.5, 1.0]
        );
        this.floor = new Wall(
            cube,
            [256, 256, 1],
            [0, 0, 0],
            [Angle.fromDegrees(-90), [1, 0, 0]],
            [1.0, 1.0, 1.0]
        );
    }

    update(): void {
        this.leftWall.update();
        this.rightWall.update();
        this.frontWall.update();
        this.ceiling.update();
        this.floor.update();
    }

    draw(lagFix: number): void {
        this.leftWall.draw(lagFix);
        this.rightWall.draw(lagFix);
        this.frontWall.draw(lagFix);
        this.ceiling.draw(lagFix);
        this.floor.draw(lagFix);
    }
}