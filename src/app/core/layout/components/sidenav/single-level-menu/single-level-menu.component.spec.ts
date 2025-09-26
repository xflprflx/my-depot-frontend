import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLevelMenuComponent } from './single-level-menu.component';

describe('SingleLevelMenuComponent', () => {
  let component: SingleLevelMenuComponent;
  let fixture: ComponentFixture<SingleLevelMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleLevelMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleLevelMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
