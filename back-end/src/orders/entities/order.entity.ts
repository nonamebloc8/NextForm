// src/orders/entities/order.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { OrderItem } from './order-item.entity';

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'COMPLETED' | 'CANCELLED';

@Entity('orders')
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

@Column({ nullable: true })
customerName: string;


  @Column({ nullable: false, default: '' })
productName: string;


  @Column()
  customerEmail: string;

  @Column()
  customerPhone: string;

  @Column()
  shippingAddress: string;

  @Column({ nullable: true })
  paymentMethod: string;

  @Column({ default: 'PENDING' })
  paymentStatus: string;

  @Column('decimal', { precision: 10, scale: 2 })
  subTotal: number;

  @Column('decimal', { precision: 10, scale: 2 })
  shippingPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({ default: 'PENDING' })
  status: OrderStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];
}
