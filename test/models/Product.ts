import { model, Model, property } from 'firemodel';

export type ProductCategory = 'foo' | 'bar' | 'baz';

@model()
export class Product extends Model {
  @property name!: string;
  @property price!: number;
  @property category!: ProductCategory;
  @property description?: string;
}
