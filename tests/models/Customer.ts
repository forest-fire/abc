import { model, Model, property, hasMany, fks } from 'firemodel';

export interface IAddress {
  address1: string;
  address2?: string;
  city?: string;
  state: string;
  zipCode: string;
}

@model()
export class Customer extends Model {
  @property name!: string;
  @property address?: IAddress;
  @hasMany('Order', 'customer') orders?: fks;
}
