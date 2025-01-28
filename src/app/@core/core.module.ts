import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { HeaderComponent } from './components/header/header.component';
import { I18nComponent } from './components/i18n/i18n.component';

@NgModule({
  imports: [ReactiveFormsModule, MaterialModule, CommonModule, RouterModule],
  declarations: [LoaderComponent, HeaderComponent, I18nComponent],
  exports: [LoaderComponent],
})
export class CoreModule {}
