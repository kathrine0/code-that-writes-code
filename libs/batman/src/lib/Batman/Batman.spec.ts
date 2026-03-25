import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Batman } from './Batman';

describe('Batman', () => {
  let component: Batman;
  let fixture: ComponentFixture<Batman>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Batman],
    }).compileComponents();

    fixture = TestBed.createComponent(Batman);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
