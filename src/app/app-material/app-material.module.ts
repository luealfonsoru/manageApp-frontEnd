import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule,MatIconModule,MatButtonModule,MatDialogModule,MatInputModule,MatCardModule} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule,MatIconModule,MatButtonModule,MatDialogModule,MatInputModule,MatCardModule],
  exports: [MatToolbarModule,MatIconModule,MatButtonModule,MatDialogModule,MatInputModule,MatCardModule],
})
export class MyMaterialModule { }