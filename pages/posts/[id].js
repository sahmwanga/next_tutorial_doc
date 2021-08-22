import { useRouter } from 'next/router';
import axios from 'axios';

function Posts({ post }) {
  const router = useRouter();
  const { id } = router.query;

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{id}</h1>
      <pre>{JSON.stringify({ post }, null, 4)}</pre>
    </div>
  );

  // Render post...
}

// This function gets called at build time
export async function getStaticPaths() {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts`
  );
  const paths = response.data.map((value) => ({
    params: { id: `${value.id}` },
  }));

  return {
    paths: paths,
    fallback: true,
  };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );

  // Pass post data to the page via props
  return {
    props: { post: response.data },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  };
}

export default Posts;
