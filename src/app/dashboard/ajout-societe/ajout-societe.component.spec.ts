import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSocieteComponent } from './ajout-societe.component';

describe('AjoutSocieteComponent', () => {
  let component: AjoutSocieteComponent;
  let fixture: ComponentFixture<AjoutSocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutSocieteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
