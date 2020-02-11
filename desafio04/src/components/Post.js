import React from 'react';

import Comment from './Comment';

export default function Post({ data }) {
  const { author, date, comments, content } = data;

  return (
    <div className="postContainer">
      <div className="postHeader">
        <img className="avatar" src={author.avatar} alt={author.name} />
        <div className="postData">
          <div className="postAuthorName">{author.name}</div>
          <span>{date}</span>
        </div>
      </div>

      <div className="postContent">{content}</div>

      <div className="borderBottom" />

      {comments ? (
        comments.map(comment => <Comment key={comment.id} data={comment} />)
      ) : (
        <></>
      )}
    </div>
  );
}
