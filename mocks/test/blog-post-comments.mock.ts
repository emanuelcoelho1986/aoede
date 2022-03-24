import {Comment} from '../../src/app/modules/blog/model/comment';

export const BlogPostCommentsMock: Comment[] = [
  {
    comments: [
      {
        comments: [{
          comments: [],
          content: "Comment 3",
          date: "2022-01-01 00:02:00",
          id: 2,
          parent_id: 1,
          post_id: 0,
          user: "Lilly Doe"
        }], content: "Comment 2", date: "2022-01-01 00:01:00", id: 1, parent_id: 0, post_id: 0, user: "Jane Doe"
      }
    ], content: "Comment 1", date: "2022-01-01 00:00:00", id: 0, parent_id: null, post_id: 0, user: "John Doe"
  },
  {
    comments: [],
    content: "Comment 4",
    date: "2022-01-01 00:03:00",
    id: 3,
    parent_id: null,
    post_id: 0,
    user: "Mighty Dow"
  }
];
