import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import SERVICES from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    HttpClientModule
  ],
  providers: [
    ...SERVICES
  ]
})
export class BlogModule { }
