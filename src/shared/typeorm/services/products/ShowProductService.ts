import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/typeorm';
import Product from '@shared/typeorm/entities/Product';
import IProduct from '@shared/typeorm/interfaces/IProduct';

class ShowProductService {
  public async execute({ id }: IProduct): Promise<Product | undefined> {
    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOne({ where: { id } });
    if (!product) {
      throw new AppError('Produto não encontrado');
    }
    return product;
  }
}

export default ShowProductService;
