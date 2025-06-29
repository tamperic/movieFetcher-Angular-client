import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanreDialog } from './genre-dialog';

describe('GanreDialog', () => {
  let component: GanreDialog;
  let fixture: ComponentFixture<GanreDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GanreDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GanreDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
