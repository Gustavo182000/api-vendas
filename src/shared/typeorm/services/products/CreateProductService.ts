import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/typeorm';
import Product from '@shared/typeorm/entities/Product';
import IProduct from '@shared/typeorm/interfaces/IProduct';

class CreateProductService {
  public async execute({ name, price, quantity }: IProduct): Promise<Product> {
    const productRepository = AppDataSource.getRepository(Product);
    const productExists = await productRepository.findOne({ where: { name } });
    if (productExists) {
      throw new AppError('Esse produto já existe');
    }
    const product = productRepository.create({ name, price, quantity });
    await productRepository.save(product);

    return product;
  }
}

export default CreateProductService;
