import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FileUploadControlComponent } from './file-upload-control.component';

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
  });

  it('should create the FileUploadControlComponent', () => {
    const fixture = TestBed.createComponent(FileUploadControlComponent);
    const cmp = fixture.componentInstance;
    expect(cmp).toBeTruthy();
  });

});
