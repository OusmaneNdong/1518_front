import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeurDetailsComponent } from './demandeur-details.component';

describe('DemandeurDetailsComponent', () => {
  let component: DemandeurDetailsComponent;
  let fixture: ComponentFixture<DemandeurDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeurDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeurDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
