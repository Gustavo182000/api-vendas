import AppDataSource from '@shared/typeorm';
import Product from '@shared/typeorm/entities/Product';
import RedisCache from '../../../cache/RedisCache';

class ListProductService {
  public async execute(): Promise<Product[] | undefined> {
    const productRepository = AppDataSource.getRepository(Product);
    const redisCache = new RedisCache();

    const products = await productRepository.find();

    await redisCache.save('teste', 'teste2');

    return products;
  }
}

export default ListProductService;
