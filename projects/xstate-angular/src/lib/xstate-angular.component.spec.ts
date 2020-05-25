import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XstateAngularComponent } from './xstate-angular.component';

describe('XstateAngularComponent', () => {
  let component: XstateAngularComponent;
  let fixture: ComponentFixture<XstateAngularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XstateAngularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XstateAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
