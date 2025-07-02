'use client';

import { subscriptionSortOptions } from '@/shared/constants/sortOptions';
import { Button } from '@/shared/ui/shadcn/button';
import { Input } from '@/shared/ui/shadcn/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/select';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { RxReset } from 'react-icons/rx';
import { useSubscriptionFilters } from '../model/useSubscriptionFilters';

export default function ControlPanel() {
  const params = useParams();
  const [active, setActive] = useState(false);
  const { query, setSort, setQuery } = useSubscriptionFilters();
  const resetFilters = useCallback(() => {
    setQuery('');
  }, []);

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-white px-6 py-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      role="toolbar"
    >
      <div className="flex items-center gap-2">
        <p>Showing</p>
        <p className="font-bold capitalize">{params?.slug || 'All'}</p>
      </div>

      {active && (
        <div className="flex items-center gap-4">
          <div className="relative w-64 min-w-[200px]">
            <Input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full"
            />
            {query && (
              <button
                onClick={resetFilters}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-400 hover:text-black dark:hover:text-white"
              >
                <RxReset className="h-5 w-5" />
              </button>
            )}
          </div>

          <div className="w-64 min-w-[200px]">
            <Select onValueChange={setSort}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                {subscriptionSortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Button
          onClick={() => setActive((prev) => !prev)}
          className="h-10 w-10 p-2"
          variant="outline"
        >
          <FaSearch />
        </Button>

        <Link className="link-outline link h-10 w-10 p-2" href="/">
          <FaPlus />
        </Link>
      </div>
    </div>
  );
}
