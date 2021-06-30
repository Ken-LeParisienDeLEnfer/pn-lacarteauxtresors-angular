import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FileUploadControlComponent } from './components/file-upload-control/file-upload-control.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadControlComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
