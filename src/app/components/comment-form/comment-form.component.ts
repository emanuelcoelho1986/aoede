import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

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


  didPressSubmitButton() {
    if(this.commentFormGroup.valid) {
      this.onSubmitForm.emit(this.commentFormGroup.value);
    }
  }

  didPressCancelButton(evt: Event) {
    // I'm not sure if we can remove the if nowadays. Muscle empty from my past
    if(evt.preventDefault) evt.preventDefault();
    if(evt.stopPropagation) evt.stopPropagation();

    this.commentFormGroup.reset();
    this.onCancelForm.emit(true);
  }

  get shouldDisableSubmitButton(): boolean {
    return !this.commentFormGroup.valid;
  }
}
