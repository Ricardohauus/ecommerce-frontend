export interface ProductModelServer {

  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  images: string;
  image: string;

}

export interface ServerResponse {
  products: ProductModelServer[];
  count: number;

}
