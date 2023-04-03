import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantConsultesComponent } from './restaurant-consultes.component';

describe('RestaurantConsultesComponent', () => {
  let component: RestaurantConsultesComponent;
  let fixture: ComponentFixture<RestaurantConsultesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantConsultesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantConsultesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
