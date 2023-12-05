import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeSocieteComponent } from './list-type-societe.component';

describe('ListTypeSocieteComponent', () => {
  let component: ListTypeSocieteComponent;
  let fixture: ComponentFixture<ListTypeSocieteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTypeSocieteComponent]
    });
    fixture = TestBed.createComponent(ListTypeSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
