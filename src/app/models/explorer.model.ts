import { Point } from './point.model';

export class Explorer extends Point {
    label: string = "A";
    isBlocksExplorer: boolean = true;
    orientation?: string;
    moves?: string;
    nbTresoursPicked: number = 0;
    name?: string;

    constructor (name: string, x: number, y: number, orientation: string, moves: string) {
        super();
        this.name = name;
        this.x = x;
        this.y = y;
        this.orientation = orientation;
        this.moves = moves;
    }
}