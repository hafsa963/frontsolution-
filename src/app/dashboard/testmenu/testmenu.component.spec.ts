import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestmenuComponent } from './testmenu.component';

describe('TestmenuComponent', () => {
  let component: TestmenuComponent;
  let fixture: ComponentFixture<TestmenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestmenuComponent]
    });
    fixture = TestBed.createComponent(TestmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
