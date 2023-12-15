import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationsClientComponent } from './prestations-client.component';

describe('PrestationsClientComponent', () => {
  let component: PrestationsClientComponent;
  let fixture: ComponentFixture<PrestationsClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrestationsClientComponent]
    });
    fixture = TestBed.createComponent(PrestationsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
