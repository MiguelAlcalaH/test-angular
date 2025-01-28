import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@app/material.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './components/profile.component';

import { CoreModule } from '@core';

@NgModule({
  imports: [CommonModule, MaterialModule, ProfileRoutingModule, CoreModule],
  declarations: [ProfileComponent],
})
export class ProfileModule {}
