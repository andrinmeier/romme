import { Angle } from "./Angle";
import { Cube } from "./Cube";
import { ISceneObject } from "./ISceneObject";
import { Table } from "./Table";
import { Wall } from "./Wall";

export class Room implements ISceneObject {
    private readonly leftWall: Wall;
    private readonly rightWall: Wall;
    private readonly frontWall: Wall;
    private readonly ceiling: Wall;
    private readonly floor: Wall;
    private readonly table: Table;
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
        this.table = new Table(
            cube,
            [200, 256, 1],
            [28, 25, -10],
            [Angle.fromDegrees(-90), [1, 0, 0]],
            [155 / 255, 103 / 255, 60 / 255]
        );
    }

    resize(width: number, height: number) {
        this.leftWall.resize([256, height, 1]);
        this.rightWall.resize([256, height, 1]);
        this.rightWall.move([width, 0, -256]);
        this.frontWall.resize([width, height, 1]);
        this.ceiling.resize([width, 256, 1]);
        this.ceiling.move([0, height, -256]);
        this.floor.resize([width, 256, 1]);
        const tableWidth = (2 * width) / 3;
        this.table.resize([tableWidth, height, 1]);
        this.table.move([(width - tableWidth) / 2, 0.1 * height, -10]);
    }

    update(): void {
        this.leftWall.update();
        this.rightWall.update();
        this.frontWall.update();
        this.ceiling.update();
        this.floor.update();
        this.table.update();
    }

    draw(lagFix: number): void {
        this.leftWall.draw(lagFix);
        this.rightWall.draw(lagFix);
        this.frontWall.draw(lagFix);
        this.ceiling.draw(lagFix);
        this.floor.draw(lagFix);
        this.table.draw(lagFix);
    }
}
