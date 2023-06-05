import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/typeorm';
import Customers from '@shared/typeorm/entities/Customer';

interface ICustommer {
  id: string;
  name: string;
  email: string;
}

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<ICustommer> {
    const customerRepository = AppDataSource.getRepository(Customers);
    const customer = await customerRepository.findOne({ where: { id } });

    if (!customer) {
      throw new AppError('Cliente não encontrado');
    }

    const customerExists = await customerRepository.findOne({
      where: { email },
    });

    if (!customerExists) {
      throw new AppError('E-mail já cadasrado');
    }

    customer.email = email;
    customer.name = name;

    return customer;
  }
}

export default CreateCustomerService;
