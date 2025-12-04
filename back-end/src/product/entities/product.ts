// src/products/entities/product.entity.ts
import { OrderItem } from 'src/orders/entities/order-item.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
// import type { OrderItem } from 'src/orders/entities/order-item.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('float')
  price: number;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: 0 })
  stock: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.productId)
  orderItems: OrderItem[];
}
