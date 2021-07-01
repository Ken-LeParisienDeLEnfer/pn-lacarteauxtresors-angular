import { Component, Input, OnInit } from '@angular/core';
import { EXPLORER_ID, MAP_ID, MOUNTAIN_ID, ORIENTATIONS, SEPARATOR, TRESOUR_ID } from 'src/app/constants/app.constants';
import { Controls } from 'src/app/models/controls.model';

@Component({
  selector: 'app-file-upload-control',
  templateUrl: './file-upload-control.component.html',
  styleUrls: ['./file-upload-control.component.css']
})
export class FileUploadControlComponent implements OnInit {

    linesOriginalFile: string[] = [];

    controls: Controls = new Controls();


    constructor() {
    }

    ngOnInit() {}

    changeFileListener(event: any){
        const file:File = event.target.files[0];
        if (file != null) {

            console.log(file.name);
            console.log(file.size);
            console.log(file.type);
            //Extract data from file
            let reader: FileReader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                let fileResult: any = reader.result;
                this.linesOriginalFile = fileResult.split("\r\n");
                console.log(this.linesOriginalFile);
                // clear all comments
                this.linesOriginalFile.filter(line => line.startsWith("#"));
                this.controls.isFileLoaded = true;
                this.controlFileData();
                this.createMapAndPoints();
            };
        }
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
    }

    

}