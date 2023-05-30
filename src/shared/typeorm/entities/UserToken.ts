import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_token')
class UserToken {
  @PrimaryColumn('uuid')
  id: string;
  @Column()
  @Generated('uuid')
  token: string;
  @Column()
  user_id: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}

export default UserToken;
