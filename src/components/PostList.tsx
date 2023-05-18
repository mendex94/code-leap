import { Post } from '../actions/posts';
import {useState, useEffect, useRef, LegacyRef } from 'react';
import PostCard from './PostCard';

interface PostListProps {
  posts: Post[];
  onEndReached: () => void;
  loaderSpinner: () => JSX.Element | null;
  onEndReachedThreshold: number;
}

const PostList = ({posts: data, onEndReachedThreshold, onEndReached, loaderSpinner }: PostListProps) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);

    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
      setPosts(data);

      if (typeof IntersectionObserver !== 'undefined') {
        observer.current = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              onEndReached();
            }
          },
          { threshold: onEndReachedThreshold }
        );
  
        if (lastElement) {
          observer.current.observe(lastElement);
        }
      }
  
      return () => {
        if (observer.current && lastElement) {
          observer.current.unobserve(lastElement);
        }
      };
    }, [lastElement, onEndReached, onEndReachedThreshold]);



    return (
        <>
            {posts.map((post, index) => {
                if (posts.length === index + 1) {
                    return (
                        <div key={`${post.id}-${post.username}-${index}`}>
                            <PostCard post={post} />
                        </div>
                    );
                } else {
                    return (
                        <div key={post.id} ref={setLastElement as unknown as LegacyRef<HTMLDivElement>}>
                            <PostCard post={post} />
                        </div>
                    );
                }
            })}
            {loaderSpinner()}
        </>
    )
}

export default PostList