import { useState } from 'react';

export const useSubscriptionFilters = () => {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('createdAt-desc');

  const [sortBy, order] = sort.split('-');

  return {
    query,
    sort,
    sortBy,
    order,
    setSort,
    setQuery,
  };
};
