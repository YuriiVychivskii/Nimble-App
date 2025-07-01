import Link from 'next/link';
import { FaRegFolderOpen } from 'react-icons/fa';
import { sidebarItems } from '../constants/sidebarItems';

export default function Sidebar() {
  // Active item with slug (Params)

  return (
    <aside className="mt-4 w-64 rounded-2xl border bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <ul className="flex flex-col gap-2">
        {sidebarItems.map(({ title, slug }) => (
          <li key={slug}>
            <Link
              href={`/subscriptions/${slug}`}
              className="group flex items-center justify-between rounded-md px-3 py-2 font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-blue-500 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <div className="flex items-center gap-3">
                <FaRegFolderOpen className="h-5 w-5 shrink-0 text-zinc-500 transition-colors group-hover:text-blue-500" />
                <span>{title}</span>
              </div>
              <div className="text-xs text-zinc-400">( )</div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
