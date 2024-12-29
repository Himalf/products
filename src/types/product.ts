export interface IProduct {
  productId: number;
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  // rating: {
  //   count: number;
  //   rate: number;
  // };
  rating: number;
  reviews: string[];
  images: string[];
}
