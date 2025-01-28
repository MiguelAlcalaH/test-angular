import { TestBed, inject } from '@angular/core/testing';

import { HeaderComponent } from '@app/@core/components/header/header.component';
import { Shell } from './shell.service';

describe('Shell', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [],
    });
  });

  describe('childRoutes', () => {
    it('should create routes as children of shell', () => {
      // Prepare
      const testRoutes = [{ path: 'test' }];

      // Act
      const result = Shell.childRoutes(testRoutes);

      // Assert
      expect(result.path).toBe('');
      expect(result.children).toBe(testRoutes);
      expect(result.component).toBe(HeaderComponent);
    });
  });
});
