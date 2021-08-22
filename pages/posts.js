import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

function Post({ posts }) {
  const router = useRouter();

  console.log(router);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>List of Posts</h2>
      <ul>
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <a>
              <li>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <hr />
              </li>
            </a>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/posts'
  );

  return { props: { posts: response.data }, revalidate: 10 };
}

export default Post;
