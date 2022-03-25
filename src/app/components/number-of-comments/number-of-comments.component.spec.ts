import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NumberOfCommentsComponent} from './number-of-comments.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('NumberOfCommentsComponent', () => {
  let component: NumberOfCommentsComponent;
  let fixture: ComponentFixture<NumberOfCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NumberOfCommentsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberOfCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
