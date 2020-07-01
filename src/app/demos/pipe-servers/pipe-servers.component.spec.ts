import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeServersComponent } from './pipe-servers.component';

describe('PipeServersComponent', () => {
  let component: PipeServersComponent;
  let fixture: ComponentFixture<PipeServersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipeServersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipeServersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
