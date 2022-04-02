import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentFormComponent } from './comment-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('CommentFormComponent', () => {
  const mockFormValues = {
    author: 'John Doe',
    comment: 'Lorem ipsum dolor sit amet.'
  };

  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;
  let cancelButton: HTMLButtonElement | null;
  let submitButton: HTMLButtonElement | null;
  let authorInput: HTMLInputElement | null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ CommentFormComponent ]
    })
    .compileComponents();
  });

  function getButtonElementFrom(fixture: ComponentFixture<CommentFormComponent>, withSelector: string): HTMLButtonElement | null {
    return fixture.nativeElement.querySelector(withSelector);
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentFormComponent);
    component = fixture.componentInstance;

    component.shouldHideCancelButton = false;

    fixture.detectChanges();

    authorInput = fixture.nativeElement.querySelector('input[type="text"]');

    cancelButton = getButtonElementFrom(fixture, '[data-test-cancel-button]');
    submitButton = getButtonElementFrom(fixture, '[data-test-submit-button]');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have cancel button hidden`, () => {
    component.shouldHideCancelButton = true;
    fixture.detectChanges();

    // override after changes
    cancelButton = getButtonElementFrom(fixture, '[data-test-cancel-button]');

    expect(cancelButton).toBeNull();
  });

  it('cancel button should be disabled', () => {
    expect(cancelButton?.disabled).toBeTruthy();
  });

  it('submit button should be disabled', () => {
    expect(submitButton?.disabled).toBeTruthy();
  });

  it('should submit form with values', (done) => {
    component.onSubmitForm.subscribe((withValues) => {
      expect(withValues.author).toEqual(mockFormValues.author);
      expect(withValues.comment).toEqual(mockFormValues.comment);
      done();
    })

    component.commentFormGroup.get('author')?.setValue(mockFormValues.author);
    component.commentFormGroup.get('comment')?.setValue(mockFormValues.comment);

    fixture.detectChanges();

    expect(cancelButton?.disabled).toBeFalsy();
    expect(submitButton?.disabled).toBeFalsy();

    submitButton?.click();
  });

  it('should clear the form values', () => {
    const commentInput = fixture.nativeElement.querySelector('textarea');

    component.commentFormGroup.get('author')?.setValue(mockFormValues.author);
    component.commentFormGroup.get('comment')?.setValue(mockFormValues.comment);

    fixture.detectChanges();

    expect(authorInput?.value).toEqual(mockFormValues.author);
    expect(commentInput.value).toEqual(mockFormValues.comment);

    expect(cancelButton?.disabled).toBeFalsy();
    expect(submitButton?.disabled).toBeFalsy();

    cancelButton?.click();

    expect(authorInput?.value).toBe('');
    expect(commentInput.value).toBe('');
  });

  it('should display Author required error', () => {
    component.commentFormGroup.get('author')?.markAsTouched();
    component.commentFormGroup.get('author')?.markAsPristine();

    fixture.detectChanges();

    const errorDialogElement = fixture.nativeElement.querySelector('[data-test-author-input-errors]');

    expect(errorDialogElement).toBeTruthy();
    expect(errorDialogElement.textContent).toBe('Author name is required');
  });
});
