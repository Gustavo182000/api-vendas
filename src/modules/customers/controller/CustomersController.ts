import CreateCustomerService from '@shared/typeorm/services/customers/CreateCustomerService';
import DeleteCustomerService from '@shared/typeorm/services/customers/DeleteCustomerService';
import ListCustommerService from '@shared/typeorm/services/customers/ListCustomerService';
import ShowCustomerService from '@shared/typeorm/services/customers/ShowCustomerService';
import UpdateCustomerService from '@shared/typeorm/services/customers/UpdateCustomerService';
import { Request, Response } from 'express';

class CustomersController {
  public async index(req: Request, res: Response) {
    const listCustomerService = new ListCustommerService();
    const customers = await listCustomerService.execute();

    return res.json(customers);
  }
  public async show(req: Request, res: Response) {
    const showCustomerService = new ShowCustomerService();
    const { id } = req.params;
    const customer = await showCustomerService.execute({ id });

    return res.json(customer);
  }
  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const { id } = req.params;
    const updateService = new UpdateCustomerService();
    const customer = await updateService.execute({ id, name, email });
    return res.json(customer);
  }
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const createService = new CreateCustomerService();
    const customer = await createService.execute({ name, email });
    return res.json(customer);
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const createService = new DeleteCustomerService();
    const customer = await createService.execute({ id });
    return res.json(customer);
  }
}

export default CustomersController;
