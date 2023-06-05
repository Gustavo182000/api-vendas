import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/typeorm';
import Customers from '@shared/typeorm/entities/Customer';

interface ICustommer {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<ICustommer> {
    const customerRepository = AppDataSource.getRepository(Customers);
    const customer = await customerRepository.findOne({ where: { id } });

    if (!customer) {
      throw new AppError('Cliente não encontrado');
    }
    return customer;
  }
}

export default ShowCustomerService;
