import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MaterialModule } from '@app/material.module';
import { HealthComponent } from './health.component';
import { HealthService } from '../services/health.service';
import { CoreModule } from '@core';

describe('ApiComponent', () => {
  let component: HealthComponent;
  let fixture: ComponentFixture<HealthComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MaterialModule, CoreModule, HttpClientTestingModule],
      declarations: [HealthComponent],
      providers: [HealthService],
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
