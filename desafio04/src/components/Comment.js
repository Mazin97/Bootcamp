import React from 'react';

export default function Comment({ data }) {
  const { author, content } = data;

  return (
    <div className="comment">
      <img className="avatar" src={author.avatar} alt={author.name} />
      <div className="commentContent">
        <b>{author.name}</b> &nbsp;&nbsp;
        {content}
      </div>
    </div>
  );
}
