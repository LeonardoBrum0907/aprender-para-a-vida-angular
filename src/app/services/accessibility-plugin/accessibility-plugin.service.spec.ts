import { TestBed } from '@angular/core/testing';

import { AccessibilityPluginService } from './accessibility-plugin.service';

describe('AccessibilityPluginService', () => {
  let service: AccessibilityPluginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessibilityPluginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
