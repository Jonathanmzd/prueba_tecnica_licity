export interface ProyectoApply {
  id_project: string;
  id_supplier: string;
  items: ItemA[];
}

export interface ItemA {
  id_item: string;
  cost_supplier_und: number;
}
