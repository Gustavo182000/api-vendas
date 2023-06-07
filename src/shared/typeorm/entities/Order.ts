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

@Entity('order')
class Order {
  @PrimaryColumn('uuid')
  id: string;
  @ManyToOne(() => Customers)
  @JoinColumn({ name: 'customer_id' })
  customer: Customers;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
