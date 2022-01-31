import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCommentsComponent } from './card-comments.component';
import {CommentService} from "../../modules/blog/services/comment/comment.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CardCommentsComponent', () => {
  let component: CardCommentsComponent;
  let fixture: ComponentFixture<CardCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ CardCommentsComponent ],
      providers: [ CommentService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
