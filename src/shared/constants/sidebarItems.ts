type SidebarItem = {
  title: string;
  slug: string;
};

export const sidebarItems: SidebarItem[] = [
  { title: 'All', slug: 'all' },
  { title: 'Active', slug: 'active' },
  { title: 'Trials', slug: 'trials' },
  { title: 'Cancelled', slug: 'cancelled' },
  { title: 'Upcoming', slug: 'upcoming' },
  { title: 'Expiring', slug: 'expiring' },
  { title: 'Archived', slug: 'archived' },
];
