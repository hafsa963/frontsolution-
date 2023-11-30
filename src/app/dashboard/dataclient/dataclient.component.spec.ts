import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataclientComponent } from './dataclient.component';

describe('DataclientComponent', () => {
  let component: DataclientComponent;
  let fixture: ComponentFixture<DataclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataclientComponent]
    });
    fixture = TestBed.createComponent(DataclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
