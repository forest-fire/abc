import { datetime } from 'common-types';
import { model, Model, property, index } from 'firemodel';

@model()
export class Todo extends Model {
  @property @index name!: string;
  @property @index ownedBy?: string;
  @property @index due?: datetime;
}
