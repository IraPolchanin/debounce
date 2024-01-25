import postsFromServer from '../api/posts.json';
import { Post } from '../types/Post';
import { getUserById } from './user';

export function getPreparedPosts(): Post[] {
  return postsFromServer.map(post => ({
    ...post,
    user: getUserById(post.userId),
  }));
}

export function getMaxId(posts: Post[]) {
  return Math.max(
    ...posts.map(post => post.id),
  );
}