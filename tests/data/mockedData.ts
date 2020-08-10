import { Mock } from 'firemodel';
import { RealTimeAdmin } from 'universal-fire';
import { Customer } from '../models/Customer';

export const mockedData = async () => {
  const db = await RealTimeAdmin.connect({ mocking: true });
  console.log({ db });

  const m = await Mock(Customer, db)
    .followRelationshipLinks()
    .generate(10);
};

(async () => {
  console.log(JSON.stringify(mockedData(), null, 2));
})();
