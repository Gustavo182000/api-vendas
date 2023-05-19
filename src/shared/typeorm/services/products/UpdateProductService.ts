import AppError from '@shared/errors/AppError';
import AppDataSource from '@shared/typeorm';
import Product from '@shared/typeorm/entities/Product';
import IProduct from '@shared/typeorm/interfaces/IProduct';

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IProduct): Promise<Product> {
    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOne({ where: { id } });
    if (!product) {
      throw new AppError('Produto não encontrado');
    }
    const productNameExists = await productRepository.findOne({
      where: { name },
    });
    if (productNameExists && name !== product.name) {
      throw new AppError('Produto com o mesmo nome encontrado');
    }
    product.name = name!;
    product.price = price!;
    product.quantity = quantity!;

    await productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
