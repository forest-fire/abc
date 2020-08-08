import { model, Model, property, hasMany, hasOne, fks, fk } from 'firemodel';


@model()
export class Order extends Model {
  @property lineItems!: Array<[productId: fk, quantity: number, unitPrice: number]>

  @hasOne('Customer', 'orders') customer!: fk;
}
