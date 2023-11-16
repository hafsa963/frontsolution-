import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NvColabComponent } from './nv-colab.component';

describe('NvColabComponent', () => {
  let component: NvColabComponent;
  let fixture: ComponentFixture<NvColabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NvColabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NvColabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
