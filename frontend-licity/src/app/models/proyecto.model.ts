export interface Proyecto {
  name: string;
  initial_date: string;
  final_date: string;
  images: Img[];
  items: Item[];
}

export interface Item {
  item: string;
  cost_und: number;
  _id: string;
}

export interface Img {
  name: string;
  url: number;
}
