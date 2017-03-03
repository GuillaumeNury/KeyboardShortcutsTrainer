import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TrainingComponent } from './training/training.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { AutoHeightDirective } from './directives/auto-height.directive';

@NgModule({
  declarations: [
    AppComponent,
    TrainingComponent,
    TextEditorComponent,
    AutoHeightDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
