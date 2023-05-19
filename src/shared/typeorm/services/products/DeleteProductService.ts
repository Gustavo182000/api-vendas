import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/typeorm';
import Product from '@shared/typeorm/entities/Product';
import IProduct from '@shared/typeorm/interfaces/IProduct';

class DeleteProductService {
  public async execute({ id }: IProduct): Promise<void> {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOne({ where: { id } });
    if (!product) {
      throw new AppError('Produto não encontrado');
    }
    await productRepository.remove(product);
  }
}

export default DeleteProductService;
