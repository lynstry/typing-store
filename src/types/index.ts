export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  price: string;
  regularPrice: string;
  salePrice: string;
  image?: {
    sourceUrl: string;
    altText?: string;
  };
  galleryImages?: {
    nodes: Array<{
      sourceUrl: string;
      altText?: string;
    }>;
  };
}

export interface CartItem extends Product {
  quantity: number;
}
