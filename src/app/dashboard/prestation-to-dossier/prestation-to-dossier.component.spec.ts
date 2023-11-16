import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationToDossierComponent } from './prestation-to-dossier.component';

describe('PrestationToDossierComponent', () => {
  let component: PrestationToDossierComponent;
  let fixture: ComponentFixture<PrestationToDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestationToDossierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestationToDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
