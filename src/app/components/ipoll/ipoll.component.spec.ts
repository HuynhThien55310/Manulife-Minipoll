import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpollComponent } from './ipoll.component';

describe('IpollComponent', () => {
  let component: IpollComponent;
  let fixture: ComponentFixture<IpollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
