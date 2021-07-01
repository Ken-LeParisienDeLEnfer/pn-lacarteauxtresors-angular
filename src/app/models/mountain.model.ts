import { PointType } from './point-type.model';

export class Mountain extends PointType {
    label: string = "M";
    isBlocksExplorer: boolean = true;
}