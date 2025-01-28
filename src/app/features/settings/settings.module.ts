import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@app/material.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './components/settings.component';

import { CoreModule } from '@core';

@NgModule({
  imports: [CommonModule, MaterialModule, SettingsRoutingModule, CoreModule],
  declarations: [SettingsComponent],
})
export class SettingsModule {}
