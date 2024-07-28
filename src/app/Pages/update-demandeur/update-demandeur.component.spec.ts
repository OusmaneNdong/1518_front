import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDemandeurComponent } from './update-demandeur.component';

describe('UpdateDemandeurComponent', () => {
  let component: UpdateDemandeurComponent;
  let fixture: ComponentFixture<UpdateDemandeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDemandeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDemandeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
