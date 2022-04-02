import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent {
  @Input()
  shouldHideCancelButton: boolean = false;

  commentFormGroup = new FormGroup({
    author: new FormControl('', [
      Validators.required
    ]),
    comment: new FormControl('', [
      Validators.required
    ])
  })

  @Output()
  onSubmitForm: EventEmitter<{author: string, comment: string}> = new EventEmitter<{author: string, comment: string}>();

  @Output()
  onCancelForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  get shouldDisableSubmitButton(): boolean {
    return !this.commentFormGroup.valid;
  }

  get shouldDisableCancelButton(): boolean {
    return Object.values(this.commentFormGroup.controls)
      .map(formControl => formControl.value)
      .reduce(value => value.toString().trim())
      .length === 0 && !this.commentFormGroup.touched;
  }

  get authorFormControl(): AbstractControl | null {
    return this.commentFormGroup.get('author');
  }

  get commentFormControl(): AbstractControl | null {
    return this.commentFormGroup.get('comment');
  }

  didPressSubmitButton() {
    if(this.commentFormGroup.valid) {
      this.onSubmitForm.emit(this.commentFormGroup.value);
    }
  }

  /**
   * When user presses cancel button
   * The Cancel button is only active if the form has something.
   * Will clean the form. We could use a confirmation modal or alert to confirm if the
   * user really wants to clear the form
   * @param evt Event
   */
  didPressCancelButton(evt: Event) {
    // I'm not sure if we can remove the if nowadays. Muscle empty from my past
    if(evt.preventDefault) evt.preventDefault();
    if(evt.stopPropagation) evt.stopPropagation();

    this.commentFormGroup.reset();

    this.onCancelForm.emit(true);
  }
}
