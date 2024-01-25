import React, { useCallback, useMemo, useState } from 'react';

import { Post } from './types/Post';
import { getMaxId, getPreparedPosts } from './services/posts';
import { PostForm } from './components/PostForm';
import { PostList } from './components/PostList';

function debounce(callback:Function, delay:number) {
  let timerId = 0;
  window.clearTimeout(timerId);
  return (...args:any) => {
    timerId = window.setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

export const App: React.FC = () => {

  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>(getPreparedPosts());
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const applyQuery = debounce(setAppliedQuery, 1000)


  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value)
  }


  const updatePost = (selectedPost: Post) => {
    setPosts(currentPosts => {
      const updatedPosts = [...currentPosts];
      const index = updatedPosts.findIndex(post => post.id === selectedPost.id);
      updatedPosts.splice(index, 1, selectedPost)
      return updatedPosts;
    })
  }

  const deletePost = useCallback((postId: number) => setPosts(curPosts => curPosts.filter(post => post.id !== postId)), []);

  const addPost = useCallback((post: Post) => {
    setPosts(currentPosts => {
      const newPost = {
        ...post,
        id: getMaxId(currentPosts) + 1,
      };
      return [newPost, ...currentPosts]
    });
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => post.title.includes(appliedQuery))
  }, [appliedQuery, posts])

  return (
    <div className="section py-5">
      <div className="columns is-mobile">
        <div className="column">
          <h1 className="title">Posts</h1>
        </div>

        <div className="column">
          <input
            type="text"
            className="input is-rounded"
            value={query}
            onChange={handleQueryChange}
          />
        </div>
      </div>

      <PostList
        posts={filteredPosts}
        onDelete={deletePost}
        onSelect={setSelectedPost}
        selectedPostId={selectedPost?.id}
      />
      {selectedPost ? (
        <PostForm onSubmit={updatePost} post={selectedPost} key={selectedPost.id} onReset={() => setSelectedPost(null)} />
      ) : (
        <PostForm onSubmit={addPost} />
      )}
    </div>
  );
};