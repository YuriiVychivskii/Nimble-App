'use client';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ToggleTheme() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      variant="outlineRounded"
      className="relative w-20 px-1 transition-colors duration-300"
    >
      <div
        className={cn(
          'absolute left-1 z-10 flex h-7 w-7 items-center justify-center rounded-full border bg-gray-900 transition-transform duration-300 ease-in-out',
          theme === 'dark' ? 'translate-x-0' : 'translate-x-[40px]',
        )}
      >
        {theme === 'dark' ? (
          <MoonIcon className="size-4 text-blue-500" />
        ) : (
          <SunIcon className="size-4 text-yellow-500" />
        )}
      </div>

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
