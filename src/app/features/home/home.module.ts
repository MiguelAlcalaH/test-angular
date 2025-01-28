import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home.component';

@NgModule({
  imports: [CommonModule, MaterialModule, HomeRoutingModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
