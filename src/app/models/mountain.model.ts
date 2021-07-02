import { Point } from './point.model';

export class Mountain extends Point {
    label: string = "M";
    isBlocksExplorer: boolean = true;

    constructor (x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }
}