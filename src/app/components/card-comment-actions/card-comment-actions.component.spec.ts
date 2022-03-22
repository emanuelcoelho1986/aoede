import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardCommentActionsComponent} from './card-comment-actions.component';

describe('CardCommentActionsComponent', () => {
  let component: CardCommentActionsComponent;
  let fixture: ComponentFixture<CardCommentActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardCommentActionsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCommentActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
