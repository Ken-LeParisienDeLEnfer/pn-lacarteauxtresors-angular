import { PointType } from './point-type.model';

export class Tresour extends PointType {
    label: string = "T";
    nbTresours?: number;
    isBlocksExplorer: boolean = false;
}