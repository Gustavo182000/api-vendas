import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/typeorm';
import Customers from '@shared/typeorm/entities/Customer';

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customerRepository = AppDataSource.getRepository(Customers);
    const customer = await customerRepository.findOne({ where: { id } });

    if (!customer) {
      throw new AppError('Cliente não encontrado');
    }
    await customerRepository.delete(customer);
  }
}

export default DeleteCustomerService;
