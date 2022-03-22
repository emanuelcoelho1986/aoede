import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardCommentComponent} from './card-comment.component';
import {SafePipe} from "../../pipes/safe.pipe";
import {CardCommentActionsComponent} from "../card-comment-actions/card-comment-actions.component";

describe('CardCommentComponent', () => {
  let component: CardCommentComponent;
  let fixture: ComponentFixture<CardCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SafePipe,
        CardCommentComponent,
        CardCommentActionsComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
