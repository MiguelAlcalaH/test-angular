import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HealthComponent } from './components/health.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: HealthComponent, data: { title: 'API Health' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class HealthRoutingModule {}
