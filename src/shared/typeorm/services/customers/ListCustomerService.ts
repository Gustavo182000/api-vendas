import AppDataSource from '@shared/typeorm';
import Customers from '@shared/typeorm/entities/Customer';

interface ICustommer {
  id: string;
  name: string;
  email: string;
}

class ListCustommerService {
  public async execute(): Promise<ICustommer[] | undefined> {
    const custommerRepository = AppDataSource.getRepository(Customers);
    const custommers = await custommerRepository.find();

    return custommers;
  }
}

export default ListCustommerService;
