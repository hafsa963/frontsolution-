import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MDPOublierComponent } from './mdp-oublier.component';

describe('MDPOublierComponent', () => {
  let component: MDPOublierComponent;
  let fixture: ComponentFixture<MDPOublierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MDPOublierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MDPOublierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
