'use client';
import { store } from '@/shared/store/store';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, useTheme } from 'next-themes';
import { Provider as ReduxProvider } from 'react-redux';
import { Toaster } from 'sonner';

function ToasterProvider() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster closeButton position="top-right" theme={resolvedTheme === 'dark' ? 'dark' : 'light'} />
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          {children}
          <ToasterProvider />
        </ThemeProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}
