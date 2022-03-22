import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BlogCardComponent} from './blog-card.component';
import {SafePipe} from "../../pipes/safe.pipe";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CardCommentsComponent} from "../card-comments/card-comments.component";
import {NumberOfCommentsComponent} from "../number-of-comments/number-of-comments.component";

describe('BlogCardComponent', () => {
  let component: BlogCardComponent;
  let fixture: ComponentFixture<BlogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        BlogCardComponent,
        CardCommentsComponent,
        NumberOfCommentsComponent,
        SafePipe
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
