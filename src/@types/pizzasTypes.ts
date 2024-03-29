export interface PizzaInterface {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
  description: string;
  count: number;
}

export type PizzasStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
