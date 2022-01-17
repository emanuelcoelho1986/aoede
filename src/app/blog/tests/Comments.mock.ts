import {Comment} from "../model/comment";

export const COMMENTS: Partial<Comment>[] =  [{
  "id": 1,
  "post_id": 1,
  "parent_id": null,
  "user": "Amelia",
  "date": "2016-02-23",
  "content": "Nulla in nulla vel nisi faucibus scelerisque. Donec quis tortor."
}, {
  "id": 2,
  "post_id": 1,
  "parent_id": 1,
  "user": "Jake",
  "date": "2016-02-23",
  "content": "Cras lectus nisl, scelerisque quis elit ut, luctus scelerisque purus."
}, {
  "id": 3,
  "post_id": 1,
  "parent_id": 2,
  "user": "Amelia",
  "date": "2016-02-24",
  "content": "Cras est nunc, tempus eget risus vitae, vulputate ornare magna."
}, {
  "id": 4,
  "post_id": 1,
  "parent_id": 1,
  "user": "Natashia",
  "date": "2016-02-23",
  "content": "Mauris malesuada a tellus at mollis. Nam eu eros ipsum."
}, {
  "id": 5,
  "post_id": 1,
  "parent_id": null,
  "user": "Shella",
  "date": "2016-02-24",
  "content": "Mauris vitae sem in nisl pharetra dapibus in nec orci."
}, {
  "id": 6,
  "post_id": 2,
  "parent_id": null,
  "user": "Hermina",
  "date": "2016-03-16",
  "content": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames."
}, {
  "id": 7,
  "post_id": 2,
  "parent_id": null,
  "user": "Natashia",
  "date": "2016-03-17",
  "content": "Nunc facilisis nisi vitae dapibus sodales. Proin vitae nunc turpis."
}];
