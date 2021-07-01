import { PointType } from './point-type.model';

export class Explorer extends PointType {
    label: string = "A";
    isBlocksExplorer: boolean = true;
    orientation?: string;
    moves?: string;
}