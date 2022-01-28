import {Component, Input} from '@angular/core';
import {Post} from "../../modules/blog/model/post";

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent {
  @Input() blogPost: Post | undefined;
}
