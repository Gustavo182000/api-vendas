import AppDataSource from '@shared/typeorm';
import Customers from '@shared/typeorm/entities/Customer';
import { Request, Response } from 'express';

interface ICustommer {
  id: string;
  name: string;
  email: string;
  password: string;
}

class ListCustommerService {
  public async execute(): Promise<ICustommer[] | undefined> {
    const custommerRepository = AppDataSource.getRepository(Customers);
    const custommers = await custommerRepository.find();

    return custommers;
  }
}

export default ListCustommerService;
