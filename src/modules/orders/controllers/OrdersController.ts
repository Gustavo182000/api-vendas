import CreateOrderService from '@shared/typeorm/services/orders/CreateOrderService';
import ShowOrderService from '@shared/typeorm/services/orders/ShowOrderService';
import { Request, Response } from 'express';

class OrdersController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showOrder = new ShowOrderService();
    const order = await showOrder.execute({ id });

    return res.json(order);
  }
  public async create(req: Request, res: Response): Promise<Response> {
    const { customer_id, products } = req.body;
    const createOrder = new CreateOrderService();
    const order = await createOrder.execute({
      customer_id,
      products,
    });
    return res.json(order);
  }
}

export default OrdersController;
