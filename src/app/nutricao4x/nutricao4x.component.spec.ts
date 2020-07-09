import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nutricao4xComponent } from './nutricao4x.component';

describe('Nutricao4xComponent', () => {
  let component: Nutricao4xComponent;
  let fixture: ComponentFixture<Nutricao4xComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nutricao4xComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nutricao4xComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
