import React from 'react';
import Link from 'next/link';

function Header() {
  return (
    <div
      style={{
        backgroundColor: 'teal',
        padding: '8px',
        color: '#fff',
        marginBottom: '16px',
      }}
    >
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/posts">
            <a>Posts</a>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
