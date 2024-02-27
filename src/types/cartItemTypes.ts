export interface CartItemInterface {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  type: string;
  size: number;
  count?: number;
}
