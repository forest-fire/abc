import { model, Model, property, hasOne, fk, mock } from 'firemodel';
import { atRandom } from 'native-dash';

@model()
export class Brand extends Model {
  @property @mock('companyName') name!: string;
  @property @mock(m => m.faker.company.catchPhrase()) tagline?: string;

  @hasOne('Brand', 'products') brand!: fk;
}
