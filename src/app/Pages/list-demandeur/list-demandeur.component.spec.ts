import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandeurComponent } from './list-demandeur.component';

describe('ListDemandeurComponent', () => {
  let component: ListDemandeurComponent;
  let fixture: ComponentFixture<ListDemandeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDemandeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDemandeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
