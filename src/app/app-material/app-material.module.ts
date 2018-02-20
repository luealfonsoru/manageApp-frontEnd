import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule,MatIconModule,MatButtonModule,MatDialogModule,MatInputModule,MatCardModule,MatButtonToggleModule,MatGridListModule} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule,MatIconModule,MatButtonModule,MatDialogModule,MatInputModule,MatCardModule,MatButtonToggleModule,MatGridListModule],
  exports: [MatToolbarModule,MatIconModule,MatButtonModule,MatDialogModule,MatInputModule,MatCardModule,MatButtonToggleModule,MatGridListModule],
})
export class MyMaterialModule { }