export type SortByType = 'rating' | 'price' | 'title';
export type SortRuNameType =
  | 'большей популярности'
  | 'меньшей популярности'
  | 'убыванию цены'
  | 'возрастанию цены'
  | 'алфавиту';

export type OrderType = 'desc' | 'asc';

export interface SortByInterface {
  sortRuName: SortRuNameType;
  sortBy: SortByType;
  order?: OrderType;
}

export interface AssignFiltrationInterface {
  sortRuName: SortRuNameType;
  sortBy: SortByType;
  page: string;
  limit: string;
  filter?: string;
  category?: string;
  order: OrderType;
}
