import React, { memo } from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  selectedPostId?:number;
  onDelete?: (id:number)=>void
  onSelect?: (post:Post)=>void
};

export const PostList: React.FC<Props> = memo(({
  posts,
  selectedPostId,
  onDelete=()=>{},
  onSelect=()=>{},
}) => {

  return (
    <table className="table is-striped is-narrow box">
      <thead>
        <tr className="has-background-link-light">
          <th>#</th>
          <th>Title</th>
          <th>User</th>
          <th></th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {posts.map(post => (
          <tr 
          key={post.id}
          className={cn({
          'has-background-info' : selectedPostId === post.id
          })}
          >
            <td>{post.id}</td>
            <td >{post.title}</td>
            <td>{post.user?.username}</td>
            <td>
              <button 
              className="icon button is-inverted is-info"
              onClick={()=>onSelect(post)}
              >
                <i className="fas fa-pen"></i>
              </button>
            </td>
            <td>
              <button 
              className="icon button is-inverted is-danger"
              onClick={()=>onDelete(post.id)}
              >
                <i className="fas fa-xmark"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});