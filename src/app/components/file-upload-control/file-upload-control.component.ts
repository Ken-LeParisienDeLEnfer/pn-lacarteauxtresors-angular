import { Component, Input, OnInit } from '@angular/core';
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
            };
        }
    }

    controlFileData() {
        // Check if map is defined
        let maps: string[] = this.linesOriginalFile.filter(line => line.startsWith("C"));
        this.controls.isAMap = maps.length == 1;
        // Check if map is correct : two numbers superior to zero
        if (this.controls.isAMap) {
            let mapElements = maps[0].split(" - ");
            this.controls.isACorrectMap = mapElements.length === 3 && mapElements.filter(el => {
                return Number.isInteger(parseInt(el));
            }).length === 2;
        }

        // Check if one or many mountains are defined
        let mountains: string[] = this.linesOriginalFile.filter(line => line.startsWith("M"));
        this.controls.isMountains = mountains.length > 0;
        if (this.controls.isMountains) {
            // if defined, check if mountains are correct
            this.controls.isCorrectMountains = mountains.find(mountain => {
                let mountainElements = mountain.split(" - ");
                return mountainElements.length != 3 || mountainElements.filter(el => {
                    return Number.isInteger(parseInt(el));
                }).length != 2;
            }) == undefined;
        }
    }

}