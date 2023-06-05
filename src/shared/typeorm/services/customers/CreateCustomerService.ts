import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/typeorm';
import Customers from '@shared/typeorm/entities/Customer';

interface ICustommer {
  id: string;
  name: string;
  email: string;
}

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<ICustommer> {
    const customerRepository = AppDataSource.getRepository(Customers);
    const customer = await customerRepository.findOne({ where: { email } });

    if (customer) {
      throw new AppError('E-mail já cadastrado');
    }

    const customerCreated = await customerRepository.create({ name, email });
    await customerRepository.save(customerCreated);

    return customerCreated;
  }
}

export default CreateCustomerService;
