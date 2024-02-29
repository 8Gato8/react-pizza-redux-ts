export interface SortByInterface {
  sortRuName: string;
  sortBy: string;
  order?: string;
}

export interface AssignFiltrationInterface {
  sortBy: string;
  page: string;
  limit: string;
  filter?: string;
  category?: string;
  order: string;
  sortRuName: string;
}
