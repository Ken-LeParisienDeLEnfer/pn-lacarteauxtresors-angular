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
    //console.log(data.ko_mapnotdefined)
    component.linesOriginalFile = data.ko_mapnotdefined;
    fixture.detectChanges();

    component.controlFileData();

    expect(component.controls.isAMap).toBeFalse();
    expect(component.controls.isACorrectMap).toBeUndefined();
  });

  it('should control that map is not correct because invalid coordinate', () => {
    //console.log(data.ko_mapnotcorrectone)
    component.linesOriginalFile = data.ko_mapnotcorrectone;
    fixture.detectChanges();

    component.controlFileData();

    expect(component.controls.isAMap).toBeTrue();
    expect(component.controls.isACorrectMap).toBeFalse();
  });

  it('should control that map is not correct because too many coordinates', () => {
    component.linesOriginalFile = data.ko_mapnotcorrecttwo;
    fixture.detectChanges();

    component.controlFileData();

    expect(component.controls.isAMap).toBeTrue();
    expect(component.controls.isACorrectMap).toBeFalse();
  });

  it('should control that map is not correct because no separator between map id and coordinates', () => {
    component.linesOriginalFile = data.ko_mapnotcorrectthree;
    fixture.detectChanges();

    component.controlFileData();

    expect(component.controls.isAMap).toBeTrue();
    expect(component.controls.isACorrectMap).toBeFalse();
  });

  it('should control that map is defined and correct', () => {
    component.linesOriginalFile = data.ko_mapdefinedandcorrect;
    fixture.detectChanges();

    component.controlFileData();

    expect(component.controls.isAMap).toBeTrue();
    expect(component.controls.isACorrectMap).toBeTrue();
  });

  it('should control that mountains is not defined', () => {
    component.linesOriginalFile = data.ok_mountainnotdefined;
    fixture.detectChanges();

    component.controlFileData();

    expect(component.controls.isMountains).toBeFalse();
    expect(component.controls.isCorrectMountains).toBeUndefined();
  });

  it('should control that mountains is not correct because one has invalid coordinates', () => {
    component.linesOriginalFile = data.ko_mountainnotcorrectone;
    fixture.detectChanges();

    component.controlFileData();

    expect(component.controls.isMountains).toBeTrue();
    expect(component.controls.isCorrectMountains).toBeFalse();
  });

  it('should control that mountains is not correct because one has missing coordinates', () => {
    component.linesOriginalFile = data.ko_mountainnotcorrecttwo;
    fixture.detectChanges();

    component.controlFileData();

    expect(component.controls.isMountains).toBeTrue();
    expect(component.controls.isCorrectMountains).toBeFalse();
  });

  it('should control that mountains is not correct because one has not any separator', () => {
    component.linesOriginalFile = data.ko_mountainnotcorrectthree;
    fixture.detectChanges();

    component.controlFileData();

    expect(component.controls.isMountains).toBeTrue();
    expect(component.controls.isCorrectMountains).toBeFalse();
  });

  it('should control that mountain is correct', () => {
    component.linesOriginalFile = data.ok_mountaincorrectanddefined;
    fixture.detectChanges();

    component.controlFileData();

    expect(component.controls.isMountains).toBeTrue();
    expect(component.controls.isCorrectMountains).toBeTrue();
  });

  it('should control that all mountains are correct', () => {
    component.linesOriginalFile = data.ok_mountainscorrectanddefined;
    fixture.detectChanges();

    component.controlFileData();

    expect(component.controls.isMountains).toBeTrue();
    expect(component.controls.isCorrectMountains).toBeTrue();
  });


});
