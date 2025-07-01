'use client';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/shadcn/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import * as motion from 'motion/react-client';
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
      className={cn('flex w-20 px-1', theme === 'dark' ? 'justify-start' : 'justify-end')}
      role="switch"
    >
      <motion.div
        className={cn(
          'z-10 flex h-7 w-7 items-center justify-center rounded-full border bg-gray-900',
        )}
        transition={{
          type: 'spring',
          visualDuration: 0.3,
          bounce: 0.2,
        }}
        layout
      >
        {theme === 'dark' ? (
          <MoonIcon className="size-4 text-blue-500" />
        ) : (
          <SunIcon className="size-4 text-yellow-500" />
        )}
      </motion.div>

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
