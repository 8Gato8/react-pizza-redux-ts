export const PAGE_LIMIT = 4;
export const INITIAL_PAGE = 1;

import { SortByInterface } from '../@types/filtrationTypes';

export const sortingFilters: SortByInterface[] = [
  { sortRuName: 'большей популярности', sortBy: 'rating', order: 'desc' },
  { sortRuName: 'меньшей популярности', sortBy: 'rating', order: 'asc' },
  { sortRuName: 'убыванию цены', sortBy: 'price', order: 'desc' },
  { sortRuName: 'возрастанию цены', sortBy: 'price', order: 'asc' },
  { sortRuName: 'алфавиту', sortBy: 'title' },
];
