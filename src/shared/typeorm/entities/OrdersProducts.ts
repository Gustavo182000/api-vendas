import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import Customers from './Customer';
import Order from './Order';
import Product from './Product';

@Entity('orders_products')
class OrdersProducts {
  @PrimaryColumn('uuid')
  id: string;
  @Column('decimal')
  price: number;
  @Column('decimal')
  quantity: number;
  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, product => product.order_products)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}

export default OrdersProducts;
