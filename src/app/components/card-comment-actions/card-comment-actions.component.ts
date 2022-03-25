import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-card-comment-actions',
  templateUrl: './card-comment-actions.component.html',
  styleUrls: ['./card-comment-actions.component.scss']
})
export class CardCommentActionsComponent {
  @Output() didPressReplyButton = new EventEmitter<boolean>();
}
