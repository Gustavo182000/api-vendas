import AppDataSource from '@shared/typeorm';
import Product from '@shared/typeorm/entities/Product';
import RedisCache from '../../../cache/RedisCache';

class ListProductService {
  public async execute(): Promise<Product[] | undefined> {
    const productRepository = AppDataSource.getRepository(Product);

    const products = await productRepository.find();

    return products;
  }
}

export default ListProductService;
