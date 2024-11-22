import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  supplierName!: string;

  @Column()
  orderDate!: Date;

  @Column('simple-json')
  products!: { name: string; quantity: number }[];

  @Column('decimal')
  totalValue!: number;

  @Column()
  status!: string;
}
