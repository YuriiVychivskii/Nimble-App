'use client';

import { useAuth } from '@/features/auth/lib/useAuth';
import ToggleTheme from '@/features/theme/ui/toggleTheme';
import UserMenu from '@/features/user/ui/userMenu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { guestNavItems, userNavItems } from '../constants/headerItems';

export default function Header() {
  const { push } = useRouter();
  const { isAuthenticated, user } = useAuth();
  const navItems = isAuthenticated ? userNavItems : guestNavItems;

  return (
    <header
      className="relative grid grid-cols-[1fr_auto_1fr] items-center rounded-xl border bg-white px-6 py-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      role="banner"
    >
      <div className="justify-self-start text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
        Nimble
      </div>

      <nav className="justify-self-center" role="navigation">
        <ul className="flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-300" role="list">
          {navItems.map(({ title, href }) => (
            <li key={title} className="transition hover:text-blue-500" role="listitem">
              <Link href={href}>{title}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-4 justify-self-end">
        <ToggleTheme />

        {isAuthenticated && user ? (
          <UserMenu user={user} />
        ) : (
          <Link href="/log-in" className="link-outline link rounded-full" role="link">
            Start Now
          </Link>
        )}
      </div>
    </header>
  );
}
