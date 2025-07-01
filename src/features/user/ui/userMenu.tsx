'use client';

import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useEffect, useRef, useState } from 'react';

const UserMenu = memo(function UserMenu({ user }: { user: User }) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setActive((prev) => !prev)}
        aria-expanded={active}
        aria-controls="user-menu-dropdown"
        className="flex w-48 cursor-pointer items-center gap-3 rounded-md px-2 py-1 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <Image
          className="rounded-full border border-zinc-300 object-cover dark:border-zinc-700"
          alt=""
          src={user?.image || '/assets/app/user.png'}
          width={40}
          height={40}
        />

        <div className="text-left">
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{user?.name}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Saved: ${}</p>
        </div>
      </button>

      {active && (
        <ul
          role="menu"
          id="user-menu-dropdown"
          className="absolute top-14 right-0 z-50 w-48 rounded-md border bg-white p-3 text-left text-sm shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
        >
          <li className="py-1 hover:text-blue-500">
            <Link href="/account">My Account</Link>
          </li>
          <li className="py-1 hover:text-blue-500">
            <Link href="/help">Help</Link>
          </li>
          <li className="py-1 hover:text-blue-500">
            <button onClick={() => signOut()}>Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
});

export default UserMenu;
