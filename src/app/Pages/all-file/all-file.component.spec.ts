import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFileComponent } from './all-file.component';

describe('AllFileComponent', () => {
  let component: AllFileComponent;
  let fixture: ComponentFixture<AllFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
