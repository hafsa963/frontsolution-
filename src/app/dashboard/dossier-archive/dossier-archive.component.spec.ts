import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierArchiveComponent } from './dossier-archive.component';

describe('DossierArchiveComponent', () => {
  let component: DossierArchiveComponent;
  let fixture: ComponentFixture<DossierArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DossierArchiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DossierArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
