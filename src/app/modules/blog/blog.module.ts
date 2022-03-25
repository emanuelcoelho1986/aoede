import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";

import SERVICES from './services';

const MODULES = [
  CommonModule,

  HttpClientModule
];

@NgModule({
  declarations: [],
  imports: [
    ...MODULES
  ],
  providers: [
    ...SERVICES
  ]
})
export class BlogModule {
}
