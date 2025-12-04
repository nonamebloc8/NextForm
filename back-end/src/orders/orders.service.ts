import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Orders } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly orderRepo: Repository<Orders>,
    @InjectRepository(OrderItem)
    private readonly itemRepo: Repository<OrderItem>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}


  /** 📌 Créer une commande avec ses items */
  async create(createDto: CreateOrderDto): Promise<Orders> {
    const items = createDto.items || [];
    const recomputedSubTotal = items.reduce(
      (sum, item) => sum + Number(item.unitPrice) * Number(item.quantity),
      0,
    );

    const subTotal = Number(createDto.subTotal) || recomputedSubTotal;
    const shippingPrice = Number(createDto.shippingPrice) || 0;
    const total = Number(createDto.total) || subTotal + shippingPrice;

    return this.dataSource.transaction(async (manager) => {


      if (!createDto.userId) {
  throw new BadRequestException('userId is required to create an order');
}

      // Création de la commande avec le type correct
      const order = manager.getRepository(Orders).create({
        customerName: createDto.customerName,
        customerEmail: createDto.customerEmail,
        customerPhone: createDto.customerPhone,
        shippingAddress: createDto.shippingAddress,
        paymentMethod: createDto.payment?.method || null,
        paymentStatus: createDto.payment ? 'PENDING' : 'NOT_PROVIDED',
        subTotal,
        shippingPrice,
        total,
        userId: createDto.userId,
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as unknown as Orders); // ✅ cast via unknown


      const savedOrder = await manager.getRepository(Orders).save(order);

      // Création des items
      const itemsToSave = items.map((item) =>
        manager.getRepository(OrderItem).create({
          order: savedOrder,
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          lineTotal: Number(item.unitPrice) * Number(item.quantity),
        }),
      );

      await manager.getRepository(OrderItem).save(itemsToSave);

      // Récupérer la commande complète avec les items
      const fullOrder = await manager.getRepository(Orders).findOneOrFail({
        where: { id: savedOrder.id },
        relations: ['items'],
      });

      return fullOrder;
    });
  }




  /** 📌 Récupérer toutes les commandes */
  async findAll(): Promise<Orders[]> {
    return this.orderRepo.find({
      order: { createdAt: 'DESC' },
      relations: ['items'],
    });
  }

  /** 📌 Récupérer une commande par ID */
  async findOne(id: number): Promise<Orders> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  /** 📌 Mettre à jour le status d'une commande */
  async updateStatus(id: number, status: Orders['status']): Promise<Orders> {
    const order = await this.findOne(id);
    order.status = status;
    return this.orderRepo.save(order);
  }

  /** 📌 Supprimer une commande */
  async remove(id: number): Promise<void> {
    await this.orderRepo.delete(id);
  }
}
