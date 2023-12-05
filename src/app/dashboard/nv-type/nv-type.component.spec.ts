import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NvTypeComponent } from './nv-type.component';

describe('NvTypeComponent', () => {
  let component: NvTypeComponent;
  let fixture: ComponentFixture<NvTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NvTypeComponent]
    });
    fixture = TestBed.createComponent(NvTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
