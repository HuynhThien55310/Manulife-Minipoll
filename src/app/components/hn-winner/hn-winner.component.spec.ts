import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HnWinnerComponent } from './hn-winner.component';

describe('HnWinnerComponent', () => {
  let component: HnWinnerComponent;
  let fixture: ComponentFixture<HnWinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HnWinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HnWinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
