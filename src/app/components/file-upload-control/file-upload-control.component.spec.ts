import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { data } from 'src/test/data';
import { FileUploadControlComponent } from './file-upload-control.component';

let component: FileUploadControlComponent;
let fixture: ComponentFixture<FileUploadControlComponent>;


describe('FileUploadControlComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        FileUploadControlComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(FileUploadControlComponent);
    component = fixture.componentInstance;
    
  });

  it('should create the FileUploadControlComponent', () => {
    expect(component).toBeTruthy();
  });

  it('file change event should arrive in handler', () => {
    let input  = fixture.debugElement.query(By.css('input[type=file]')).nativeElement;
    
    spyOn(component, 'changeFileListener');
    input.dispatchEvent(new Event('change'));
    expect(component.changeFileListener).toHaveBeenCalled();
  });

  it('should read file uploaded by user', () => {
    const mockFile = new File([''], 'filename', { type: 'text/html' });
    const mockEvt = { target: { files: [mockFile] } };
    const mockReader: FileReader = jasmine.createSpyObj('FileReader', ['readAsText', 'onload']);
    
    spyOn(window as any, 'FileReader').and.returnValue(mockReader);

    component.changeFileListener(mockEvt as any);

    expect(mockReader.readAsText).toHaveBeenCalledWith(mockFile);
  });

  it('should control that map is not defined', () => {
    component.linesOriginalFile = data.ko_mapnotdefined;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAMap).toBeFalse();
    expect(component.controls.isACorrectMap).toBeUndefined();
  });

  it('should control that map is not correct because invalid coordinate', () => {
    component.linesOriginalFile = data.ko_mapnotcorrectone;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAMap).toBeTrue();
    expect(component.controls.isACorrectMap).toBeFalse();
  });

  it('should control that map is not correct because too many coordinates', () => {
    component.linesOriginalFile = data.ko_mapnotcorrecttwo;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAMap).toBeTrue();
    expect(component.controls.isACorrectMap).toBeFalse();
  });

  it('should control that map is not correct because no separator between map id and coordinates', () => {
    component.linesOriginalFile = data.ko_mapnotcorrectthree;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAMap).toBeTrue();
    expect(component.controls.isACorrectMap).toBeFalse();
  });

  it('should control that map is defined and correct', () => {
    component.linesOriginalFile = data.ko_mapdefinedandcorrect;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAMap).toBeTrue();
    expect(component.controls.isACorrectMap).toBeTrue();
  });

  it('should control that mountains is not defined', () => {
    component.linesOriginalFile = data.ok_mountainnotdefined;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isMountains).toBeFalse();
    expect(component.controls.isCorrectMountains).toBeUndefined();
  });

  it('should control that mountains is not correct because one has invalid coordinates', () => {
    component.linesOriginalFile = data.ko_mountainnotcorrectone;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isMountains).toBeTrue();
    expect(component.controls.isCorrectMountains).toBeFalse();
  });

  it('should control that mountains is not correct because one has missing coordinates', () => {
    component.linesOriginalFile = data.ko_mountainnotcorrecttwo;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isMountains).toBeTrue();
    expect(component.controls.isCorrectMountains).toBeFalse();
  });

  it('should control that mountains is not correct because one has not any separator', () => {
    component.linesOriginalFile = data.ko_mountainnotcorrectthree;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isMountains).toBeTrue();
    expect(component.controls.isCorrectMountains).toBeFalse();
  });

  it('should control that mountain is correct', () => {
    component.linesOriginalFile = data.ok_mountaincorrectanddefined;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isMountains).toBeTrue();
    expect(component.controls.isCorrectMountains).toBeTrue();
  });

  it('should control that all mountains are correct', () => {
    component.linesOriginalFile = data.ok_mountainscorrectanddefined;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isMountains).toBeTrue();
    expect(component.controls.isCorrectMountains).toBeTrue();
  });

  it('should control that tresour is not defined', () => {
    component.linesOriginalFile = data.ko_tresournotdefined;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAtLeastOneTresour).toBeFalse();
    expect(component.controls.isCorrectTresours).toBeUndefined();
    expect(component.controls.isTresoursInsideBounds).toBeUndefined();
  });

  it('should control that tresour is not correct because invalid coordinates', () => {
    component.linesOriginalFile = data.ko_tresournotcorrect;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAtLeastOneTresour).toBeTrue();
    expect(component.controls.isCorrectTresours).toBeFalse();
    expect(component.controls.isTresoursInsideBounds).toBeUndefined();
  });

  it('should control that tresour is not correct because number of tresours not defined', () => {
    component.linesOriginalFile = data.ko_tresournotcorrecttwo;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAtLeastOneTresour).toBeTrue();
    expect(component.controls.isCorrectTresours).toBeFalse();
    expect(component.controls.isTresoursInsideBounds).toBeUndefined();
  });

  it('should control that tresour is not correct because missing separator', () => {
    component.linesOriginalFile = data.ko_tresournotcorrectthree;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAtLeastOneTresour).toBeTrue();
    expect(component.controls.isCorrectTresours).toBeFalse();
    expect(component.controls.isTresoursInsideBounds).toBeUndefined();
    
  });

  it('should control that tresour is not correct because too many infos', () => {
    component.linesOriginalFile = data.ko_tresournotcorrectfour;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAtLeastOneTresour).toBeTrue();
    expect(component.controls.isCorrectTresours).toBeFalse();
    expect(component.controls.isTresoursInsideBounds).toBeUndefined();
  });

  it('should control that tresour is correct', () => {
    component.linesOriginalFile = data.ok_tresourcorrect;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAtLeastOneTresour).toBeTrue();
    expect(component.controls.isCorrectTresours).toBeTrue();
  });

  it('should control that all tresours are correct', () => {
    component.linesOriginalFile = data.ok_tresourscorrect;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAtLeastOneTresour).toBeTrue();
    expect(component.controls.isCorrectTresours).toBeTrue();
  });

  it('should control that explorer is not defined', () => {
    component.linesOriginalFile = data.ko_explorernotdefined;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAtLeastOneExplorer).toBeFalse();
    expect(component.controls.isCorrectExplorer).toBeUndefined();
    expect(component.controls.isExplorerInsideBounds).toBeUndefined();
  });

  it('should control that explore is not correct because one element is missing', () => {
    component.linesOriginalFile = data.ko_explorernotcorrectone;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAtLeastOneExplorer).toBeTrue();
    expect(component.controls.isCorrectExplorer).toBeFalse();
    expect(component.controls.isExplorerInsideBounds).toBeUndefined();
  });

  it('should control that explore is not correct because first coordinate is not an integer', () => {
    component.linesOriginalFile = data.ko_explorernotcorrecttwo;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAtLeastOneExplorer).toBeTrue();
    expect(component.controls.isCorrectExplorer).toBeFalse();
    expect(component.controls.isExplorerInsideBounds).toBeUndefined();
  });

  it('should control that explore is not correct because second coordinate is not an integer', () => {
    component.linesOriginalFile = data.ko_explorernotcorrectthree;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAtLeastOneExplorer).toBeTrue();
    expect(component.controls.isCorrectExplorer).toBeFalse();
    expect(component.controls.isExplorerInsideBounds).toBeUndefined();
  });

  it('should control that explore is not correct because orientation not correct', () => {
    component.linesOriginalFile = data.ko_explorernotcorrectfour;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAtLeastOneExplorer).toBeTrue();
    expect(component.controls.isCorrectExplorer).toBeFalse();
    expect(component.controls.isExplorerInsideBounds).toBeUndefined();
  });

  it('should control that explore is not correct because directions not correct', () => {
    component.linesOriginalFile = data.ko_explorernotcorrectfive;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAtLeastOneExplorer).toBeTrue();
    expect(component.controls.isCorrectExplorer).toBeFalse();
    expect(component.controls.isExplorerInsideBounds).toBeUndefined();
  });

  it('should control that explore is not correct because name empty', () => {
    component.linesOriginalFile = data.ko_explorernotcorrectsix;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAtLeastOneExplorer).toBeTrue();
    expect(component.controls.isCorrectExplorer).toBeFalse();
    expect(component.controls.isExplorerInsideBounds).toBeUndefined();
  });

  it('should control that explore is correct', () => {
    component.linesOriginalFile = data.ok_explorercorrect;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAtLeastOneExplorer).toBeTrue();
    expect(component.controls.isCorrectExplorer).toBeTrue();
  });

  it('should control that explores are correct', () => {
    component.linesOriginalFile = data.ok_explorerscorrect;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAtLeastOneExplorer).toBeTrue();
    expect(component.controls.isCorrectExplorer).toBeTrue();
  });

  it('should control that mountain is out of bound', () => {
    component.linesOriginalFile = data.ko_mountainoutofbounds;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAtLeastOneExplorer).toBeTrue();
    expect(component.controls.isCorrectExplorer).toBeTrue();
    expect(component.controls.isAtLeastOneTresour).toBeTrue();
    expect(component.controls.isCorrectTresours).toBeTrue();
    expect(component.controls.isCorrectMountains).toBeTrue();
    expect(component.controls.isAMap).toBeTrue();
    expect(component.controls.isACorrectMap).toBeTrue();
    expect(component.controls.isMountainsInsideBounds).toBeFalse();
    expect(component.controls.isTresoursInsideBounds).toBeTrue();
    expect(component.controls.isExplorerInsideBounds).toBeTrue();
  });

  it('should control that mountain is inside of bound', () => {
    component.linesOriginalFile = data.ok_mountaininsidebounds;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAtLeastOneExplorer).toBeTrue();
    expect(component.controls.isCorrectExplorer).toBeTrue();
    expect(component.controls.isAtLeastOneTresour).toBeTrue();
    expect(component.controls.isCorrectTresours).toBeTrue();
    expect(component.controls.isCorrectMountains).toBeTrue();
    expect(component.controls.isAMap).toBeTrue();
    expect(component.controls.isACorrectMap).toBeTrue();
    expect(component.controls.isMountainsInsideBounds).toBeTrue();
    expect(component.controls.isTresoursInsideBounds).toBeTrue();
    expect(component.controls.isExplorerInsideBounds).toBeTrue();
  });

  it('should control that tresour is out of bound', () => {
    component.linesOriginalFile = data.ko_tresouroutofbounds;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAtLeastOneExplorer).toBeTrue();
    expect(component.controls.isCorrectExplorer).toBeTrue();
    expect(component.controls.isAtLeastOneTresour).toBeTrue();
    expect(component.controls.isCorrectTresours).toBeTrue();
    expect(component.controls.isCorrectMountains).toBeTrue();
    expect(component.controls.isAMap).toBeTrue();
    expect(component.controls.isACorrectMap).toBeTrue();
    expect(component.controls.isMountainsInsideBounds).toBeTrue();
    expect(component.controls.isTresoursInsideBounds).toBeFalse();
    expect(component.controls.isExplorerInsideBounds).toBeTrue();
  });

  it('should control that explorer is out of bound', () => {
    component.linesOriginalFile = data.ko_exploreroutofbounds;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAtLeastOneExplorer).toBeTrue();
    expect(component.controls.isCorrectExplorer).toBeTrue();
    expect(component.controls.isAtLeastOneTresour).toBeTrue();
    expect(component.controls.isCorrectTresours).toBeTrue();
    expect(component.controls.isCorrectMountains).toBeTrue();
    expect(component.controls.isAMap).toBeTrue();
    expect(component.controls.isACorrectMap).toBeTrue();
    expect(component.controls.isMountainsInsideBounds).toBeTrue();
    expect(component.controls.isTresoursInsideBounds).toBeTrue();
    expect(component.controls.isExplorerInsideBounds).toBeFalse();
  });

  it('should control that explorer is inside bound', () => {
    component.linesOriginalFile = data.ok_explorerinsidebounds;
    fixture.detectChanges();

    component.controlFileDataAndCreateCompleteMap();

    expect(component.controls.isAtLeastOneExplorer).toBeTrue();
    expect(component.controls.isCorrectExplorer).toBeTrue();
    expect(component.controls.isAtLeastOneTresour).toBeTrue();
    expect(component.controls.isCorrectTresours).toBeTrue();
    expect(component.controls.isCorrectMountains).toBeTrue();
    expect(component.controls.isAMap).toBeTrue();
    expect(component.controls.isACorrectMap).toBeTrue();
    expect(component.controls.isMountainsInsideBounds).toBeTrue();
    expect(component.controls.isTresoursInsideBounds).toBeTrue();
    expect(component.controls.isExplorerInsideBounds).toBeTrue();
  });


});
