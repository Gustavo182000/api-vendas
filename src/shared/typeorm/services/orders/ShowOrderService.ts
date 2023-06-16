import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/typeorm';
import Order from '@shared/typeorm/entities/Order';

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const orderRepository = AppDataSource.getRepository(Order);

    const order = await orderRepository.findOne({
      where: { id },
    });

    if (!order) {
      throw new AppError('Ordem não encontrada');
    }

    return order;
  }
}

export default ShowOrderService;
