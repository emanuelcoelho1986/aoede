import {Component, Input} from '@angular/core';
import {Comment} from "../../modules/blog/model/comment";

@Component({
  selector: 'app-card-comment',
  templateUrl: './card-comment.component.html',
  styleUrls: ['./card-comment.component.scss'],
})
export class CardCommentComponent {
  @Input() comment: Comment | undefined;

  get hasComments(): boolean {
    return !this.comment ? false : this.comment.comments?.length > 0;
  }

  get comments(): Comment[] {
    return this.comment?.comments || [];
  }
}
