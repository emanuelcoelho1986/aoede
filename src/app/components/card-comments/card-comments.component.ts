import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NumberOfCommentsComponent} from "../number-of-comments/number-of-comments.component";
import {Observable} from "rxjs";
import {Comment} from "../../modules/blog/model/comment";
import {map} from "rxjs/operators";

/**
 * I'm seeing this one being the following:
 *
 * 1 - Contains the number of comments as link
 * 2 - Show the first 2 comments
 * 3 - If it has more than 2 comments will have a view more because we might have replied from replies
 */
@Component({
  selector: 'app-card-comments',
  templateUrl: './card-comments.component.html',
  styleUrls: ['./card-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardCommentsComponent extends NumberOfCommentsComponent {
  get mappedComments$(): Observable<Comment[]> {
    return this.comments$.pipe(
      map((comments) => comments.filter(comment => comment.parent_id === null))
    )
  }
}
