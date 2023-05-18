import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
class Product {
  @PrimaryColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column('decimal')
  price: number;
  @Column('decimal')
  quantity: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
