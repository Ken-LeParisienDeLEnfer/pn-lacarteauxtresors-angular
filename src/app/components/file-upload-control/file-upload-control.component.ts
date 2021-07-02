import { Component, Input, OnInit } from '@angular/core';
import { EXPLORER_ID, MAP_ID, MOUNTAIN_ID, ORIENTATIONS, SEPARATOR, TRESOUR_ID } from 'src/app/constants/app.constants';
import { CompleteMap } from 'src/app/models/complete-map.model';
import { Controls } from 'src/app/models/controls.model';
import { Explorer } from 'src/app/models/explorer.model';
import { Mountain } from 'src/app/models/mountain.model';
import { Point } from 'src/app/models/point.model';
import { Tresour } from 'src/app/models/tresour.model';

@Component({
  selector: 'app-file-upload-control',
  templateUrl: './file-upload-control.component.html',
  styleUrls: ['./file-upload-control.component.css']
})
export class FileUploadControlComponent implements OnInit {

    linesOriginalFile: string[] = [];
    completeMap: CompleteMap = new CompleteMap();

    controls: Controls = new Controls();


    constructor() {
    }

    ngOnInit() {}

    changeFileListener(event: any){
        const file:File = event.target.files[0];
        if (file != null) {
            //Extract data from file
            let reader: FileReader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                let fileResult: any = reader.result;
                this.linesOriginalFile = fileResult.split("\r\n");
                // clear all comments
                this.linesOriginalFile.filter(line => line.startsWith("#"));
                this.controls.isFileLoaded = true;
                this.controlFileDataAndCreateCompleteMap();
            };
        }
    }
    

    controlFileDataAndCreateCompleteMap() {
        this.controlFileData();
        if (this.minimumRequirementsMet()) {
            this.createMapAndPoints();
        }
        
    }

    minimumRequirementsMet(): boolean {
        return true === this.controls.isAMap &&
                true === this.controls.isACorrectMap &&
                (false === this.controls.isMountains || (true === this.controls.isMountains && true === this.controls.isCorrectMountains)) &&
                true === this.controls.isAtLeastOneTresour &&
                true === this.controls.isCorrectTresours &&
                true === this.controls.isAtLeastOneExplorer &&
                true === this.controls.isCorrectExplorer;
    }

    controlFileData() {
        // Check if map is defined
        let maps: string[] = this.linesOriginalFile.filter(line => line.startsWith(MAP_ID));
        this.controls.isAMap = maps.length == 1;
        // Check if map is correct : two numbers superior to zero
        if (this.controls.isAMap) {
            let mapElements = maps[0].split(SEPARATOR);
            this.controls.isACorrectMap = mapElements.length === 3 && mapElements.filter(el => {
                return Number.isInteger(parseInt(el));
            }).length === 2;
        }

        // Check if one or many mountains are defined
        let mountains: string[] = this.linesOriginalFile.filter(line => line.startsWith(MOUNTAIN_ID));
        this.controls.isMountains = mountains.length > 0;
        if (this.controls.isMountains) {
            // if defined, check if mountains are correct
            this.controls.isCorrectMountains = mountains.find(mountain => {
                let mountainElements = mountain.split(SEPARATOR);
                return mountainElements.length != 3 || mountainElements.filter(el => {
                    return Number.isInteger(parseInt(el));
                }).length != 2;
            }) == undefined;
        }

        // Check if one or many tresours are defined
        let tresours: string[] = this.linesOriginalFile.filter(line => line.startsWith(TRESOUR_ID));
        this.controls.isAtLeastOneTresour = tresours.length > 0;
        if (this.controls.isAtLeastOneTresour) {
            // if defined, check if tresours are correct
            this.controls.isCorrectTresours = tresours.find(tresour => {
                let tresoursElements = tresour.split(SEPARATOR);
                return tresoursElements.length != 4 || tresoursElements.filter(el => {
                    return Number.isInteger(parseInt(el));
                }).length != 3;
            }) == undefined;
        }

        // Check if one or many explores are defined
        let explorers: string[] = this.linesOriginalFile.filter(line => line.startsWith(EXPLORER_ID));
        console.log(explorers);
        console.log(explorers.length);
        this.controls.isAtLeastOneExplorer = explorers.length > 0;
        if(this.controls.isAtLeastOneExplorer) {
            this.controls.isCorrectExplorer = explorers.find(explorer => {
                let explorerElements = explorer.split(SEPARATOR);
                return !(explorerElements.length == 6
                    && Number.isInteger(parseInt(explorerElements[2]))
                    && Number.isInteger(parseInt(explorerElements[3]))
                    && ORIENTATIONS.includes(explorerElements[4])
                    && explorerElements[5].match(/^[ADG>]*$/) !== null
                    && explorerElements[1].trim() != "")
            }) == undefined;
        }
    }

    createMapAndPoints() {
        let map: string[] = this.linesOriginalFile.filter(line => line.startsWith(MAP_ID));
        let xLimit: number = parseInt(map[0].split(SEPARATOR)[1]);
        let yLimit: number = parseInt(map[0].split(SEPARATOR)[2]);

        let mountains: string[] = this.linesOriginalFile.filter(line => line.startsWith(MOUNTAIN_ID));
        
        for(let mountain of mountains) {
            let mountainElements = mountain.split(SEPARATOR);
            let xMountain: number = parseInt(mountainElements[1]);
            let yMountain: number = parseInt(mountainElements[2]);
            let mountainObj: Mountain = new Mountain(xMountain, yMountain);
            if (xMountain <= xLimit && yMountain <= yLimit) {
                this.controls.isMountainsInsideBounds = true;
                this.completeMap.points?.push(mountainObj);
            } else {
                this.controls.isMountainsInsideBounds = false;
                break;
            }
        }

        let tresours: string[] = this.linesOriginalFile.filter(line => line.startsWith(TRESOUR_ID));
        for(let tresour of tresours) {
            let tresourElements = tresour.split(SEPARATOR);
            let xTresour: number = parseInt(tresourElements[1]);
            let yTresour: number = parseInt(tresourElements[2]);
            let nbOfTresours: number = parseInt(tresourElements[3]);
            let tresourObj: Tresour = new Tresour(xTresour, yTresour, nbOfTresours);
            if (xTresour <= xLimit && yTresour <= yLimit) {
                this.controls.isTresoursInsideBounds = true;
                this.completeMap.points?.push(tresourObj);
            } else {
                this.controls.isTresoursInsideBounds = false;
                break;
            }
        }

        let explorers: string[] = this.linesOriginalFile.filter(line => line.startsWith(EXPLORER_ID));
        for(let explorer of explorers) {
            let explorerElements = explorer.split(SEPARATOR);
            let name: string = explorer[1];
            let xExplorer: number = parseInt(explorerElements[2]);
            let yExplorer: number = parseInt(explorerElements[3]);
            let orientation: string = explorerElements[4];
            let moves: string = explorerElements[5];
            let explorerObj: Explorer = new Explorer(name, xExplorer, yExplorer, orientation, moves);
            if (xExplorer <= xLimit && yExplorer <= yLimit) {
                this.controls.isExplorerInsideBounds = true;
                this.completeMap.points?.push(explorerObj);
            } else {
                this.controls.isExplorerInsideBounds = false;
                break;
            }
        }

    }

    

}