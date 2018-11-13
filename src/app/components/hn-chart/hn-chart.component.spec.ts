import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HNChartComponent } from './hn-chart.component';

describe('HNChartComponent', () => {
  let component: HNChartComponent;
  let fixture: ComponentFixture<HNChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HNChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HNChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
