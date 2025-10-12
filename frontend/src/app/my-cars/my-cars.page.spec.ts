import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyCarsPage } from './my-cars.page';

describe('MyCarsPage', () => {
  let component: MyCarsPage;
  let fixture: ComponentFixture<MyCarsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCarsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
