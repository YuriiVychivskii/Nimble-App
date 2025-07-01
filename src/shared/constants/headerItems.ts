type NavItems = {
  title: string;
  href: string;
};

export const userNavItems: NavItems[] = [
  { title: 'Subscriptions', href: '/subscriptions' },
  { title: 'Calendar', href: '/calendar' },
  { title: 'Explore', href: '/explore' },
];

export const guestNavItems: NavItems[] = [
  { title: 'How It Works', href: '/how-it-works' },
  { title: 'Blog', href: '/blog' },
  { title: 'About', href: '/about' },
];
