import { Point } from './point.model';

export class Tresour extends Point {
    label: string = "T";
    nbTresours?: number;
    isBlocksExplorer: boolean = false;

    constructor (x: number, y: number, nbTresours: number) {
        super();
        this.x = x;
        this.y = y;
        this.nbTresours = nbTresours;
    }
}