import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/typeorm';
import Customers from '@shared/typeorm/entities/Customer';
import Order from '@shared/typeorm/entities/Order';
import Product from '@shared/typeorm/entities/Product';
import { In } from 'typeorm';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const orderRepository = AppDataSource.getRepository(Order);
    const customerRepository = AppDataSource.getRepository(Customers);
    const productRepository = AppDataSource.getRepository(Product);

    const customerExists = await customerRepository.findOne({
      where: { id: customer_id },
    });

    if (!customerExists) {
      throw new AppError('Cliente do ID não encontrado');
    }

    const productsIds = products.map(product => product.id);
    const existsproducts = await productRepository.find({
      where: { id: In(productsIds) },
    });

    if (!existsproducts.length) {
      throw new AppError('Nenhum produto encontrado');
    }

    const existsproductsIds = existsproducts.map(product => product.id);
    const checkInexistentProduct = products.filter(
      product => !existsproductsIds.includes(product.id),
    );
    if (checkInexistentProduct.length) {
      throw new AppError(
        `Não foi possível encontrar o produto ${checkInexistentProduct[0].id}`,
      );
    }

    const quantityAvailable = products.filter(product => {
      const foundProduct = existsproducts.find(p => p.id === product.id);
      return foundProduct && foundProduct.quantity < product.quantity;
    });
    if (quantityAvailable.length) {
      throw new AppError(
        `A quantidade ${quantityAvailable[0].quantity} é maior que o estoque: ${quantityAvailable[0].id}`,
      );
    }

    const serializeProducts = products.map(product => {
      const foundProduct = existsproducts.find(p => p.id === product.id);
      return {
        id: product.id, // corrigido para 'id' em vez de 'product_id'
        quantity: product.quantity,
        price: foundProduct?.price,
      };
    });

    const order = await orderRepository.create({
      customer: customerExists,
      order_products: serializeProducts,
    });

    const { order_products } = order;

    const updatedQuantityProduct = order_products.map(product => ({
      id: product.id,
      quantity:
        existsproducts.filter(p => p.id === product.id)[0].quantity -
        product.quantity,
    }));

    await productRepository.save(updatedQuantityProduct);

    return order;
  }
}

export default CreateOrderService;
