type SortOption = {
  label: string;
  value: string;
};

export const subscriptionSortOptions: SortOption[] = [
  { label: 'Name (A → Z)', value: 'name-asc' },
  { label: 'Name (Z → A)', value: 'name-desc' },
  { label: 'Next Payment (Soonest)', value: 'nextPaymentDate-asc' },
  { label: 'Next Payment (Latest)', value: 'nextPaymentDate-desc' },
  { label: 'Price (Lowest)', value: 'price-asc' },
  { label: 'Price (Highest)', value: 'price-desc' },
  { label: 'Recently Added', value: 'createdAt-desc' },
];
