const commentList = [
  {
    id: 1,
    postId: 1,
    content: "Bài viết rất hay",
    author: "Toan",
  },
  {
    id: 2,
    postId: 1,
    content: "Bài viết rất hay",
    author: "Tho",
  },
];

let sequenceId = commentList.length + 1;

module.exports = { commentList, sequenceId };
