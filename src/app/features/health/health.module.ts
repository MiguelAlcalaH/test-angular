import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@app/material.module';
import { HealthRoutingModule } from './health-routing.module';
import { HealthComponent } from './components/health.component';

import { CoreModule } from '@core';

@NgModule({
  imports: [CommonModule, MaterialModule, HealthRoutingModule, CoreModule],
  declarations: [HealthComponent],
})
export class HealthModule {}
