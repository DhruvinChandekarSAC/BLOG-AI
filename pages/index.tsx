import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import styles from '../styles/BlogPosts.module.css'; // Updated CSS module for an attractive design

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

const BlogPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data as Post[]);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Blog Posts</h1>
      <div className={styles.grid}>
        {posts.map((post) => (
          <div key={post.id} className={styles.card}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postContent}>{post.content}</p>
            <small className={styles.postDate}>
              {new Date(post.created_at).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;
