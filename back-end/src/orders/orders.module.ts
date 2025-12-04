import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Orders } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, OrderItem]),
  ],
  controllers: [OrdersController],   // ← obligatoire
  providers: [OrdersService],        // ← obligatoire
  exports: [OrdersService],
})
export class OrdersModule {}
