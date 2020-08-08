import { model, Model, property, hasOne, fk, mock } from 'firemodel';
import { atRandom } from 'native-dash';

export type ProductCategory = 'foo' | 'bar' | 'baz';

@model()
export class Product extends Model {
  @property @mock('words') name!: string;
  @property @mock('price') price!: number;
  @property @mock(() => atRandom(['foo', 'bar', 'baz'])) category!: ProductCategory;
  @property @mock('sentence') description?: string;

  @hasOne('Brand', 'products') brand!: fk;
}
