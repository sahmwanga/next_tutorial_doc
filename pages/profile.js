/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

function profile() {
  console.log(process.env.DB_HOST);
  const { data, error } = useSWR(
    'https://jsonplaceholder.typicode.com/posts',
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <div>
      <pre>{JSON.stringify({ data }, null, 3)}</pre>
    </div>
  );
}

export default profile;
