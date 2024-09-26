import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoonPageComponent } from './soon-page.component';

describe('SoonPageComponent', () => {
  let component: SoonPageComponent;
  let fixture: ComponentFixture<SoonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoonPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
