import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NvmanagerComponent } from './nvmanager.component';

describe('NvmanagerComponent', () => {
  let component: NvmanagerComponent;
  let fixture: ComponentFixture<NvmanagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NvmanagerComponent]
    });
    fixture = TestBed.createComponent(NvmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
