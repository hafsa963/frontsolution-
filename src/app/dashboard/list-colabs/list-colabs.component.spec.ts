import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListColabsComponent } from './list-colabs.component';

describe('ListColabsComponent', () => {
  let component: ListColabsComponent;
  let fixture: ComponentFixture<ListColabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListColabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListColabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
