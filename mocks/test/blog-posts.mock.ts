import {Post} from "../../src/app/modules/blog/model/post";

export const BlogPostsMock: Post[] = [
  {
    author: "John Doe",
    content: "<p>This is my content</p>",
    description: "",
    id: 0,
    publish_date: "2022-01-01 00:00:00",
    slug: "post-0",
    title: "Lorem Ipsum"
  },
  {
    author: "Jane Doe",
    content: "<p>This is my content</p>",
    description: "",
    id: 1,
    publish_date: "2022-01-02 00:00:00",
    slug: "post-1",
    title: "Lorem Ipsum 2"
  },
  {
    author: "Little John Doe",
    content: "<p>This is my content</p>",
    description: "",
    id: 2,
    publish_date: "2022-01-02 00:00:00",
    slug: "post-2",
    title: "Lorem Ipsum 2"
  }
];
