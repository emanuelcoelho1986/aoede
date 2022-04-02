export interface Comment {
  // Setting as optional because we might be adding one comment, and we don't have an ID set yet
  id?: Number;

  // The post ID where the comment belongs to
  postId: Number;

  // This might be a reply from a reply
  parent_id: Number | null;

  user: String;

  // Setting the date as string, for now, bvut we could use Date Object and change it on a
  // map operation
  date: String;
  content: String;

  // We might have replies
  comments: Comment[];
}
