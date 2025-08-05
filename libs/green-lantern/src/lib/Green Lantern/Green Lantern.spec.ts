import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GreenLantern } from './Green Lantern';

describe('GreenLantern', () => {
  let component: GreenLantern;
  let fixture: ComponentFixture<GreenLantern>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreenLantern],
    }).compileComponents();

    fixture = TestBed.createComponent(GreenLantern);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
