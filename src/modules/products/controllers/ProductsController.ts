import CreateProductService from '@shared/typeorm/services/products/CreateProductService';
import DeleteProductService from '@shared/typeorm/services/products/DeleteProductService';
import ListProductService from '@shared/typeorm/services/products/ListProductService';
import ShowProductService from '@shared/typeorm/services/products/ShowProductService';
import UpdateProductService from '@shared/typeorm/services/products/UpdateProductService';
import { Request, Response } from 'express';

class ProductsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listProducts = new ListProductService();
    const products = await listProducts.execute();
    return res.json(products);
  }
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showProduct = new ShowProductService();
    const product = await showProduct.execute({ id });

    return res.json(product);
  }
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const createProduct = new CreateProductService();
    const product = await createProduct.execute({ name, price, quantity });
    return res.json(product);
  }
  public async update(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const { id } = req.params;
    const updateService = new UpdateProductService();
    const product = await updateService.execute({ id, name, price, quantity });
    return res.json(product);
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteProduct = new DeleteProductService();
    await deleteProduct.execute({ id });
    return res.json([]);
  }
}

export default ProductsController;
