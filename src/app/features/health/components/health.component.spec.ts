import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { MaterialModule } from '@app/material.module';
import { HealthComponent } from './health.component';
import { HealthService } from '../services/health.service';
import { CoreModule } from '@core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ApiComponent', () => {
  let component: HealthComponent;
  let fixture: ComponentFixture<HealthComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HealthComponent],
      imports: [BrowserAnimationsModule, MaterialModule, CoreModule],
      providers: [HealthService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
