import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallePedido } from '../entities/detalle-pedido.entity';
import { DetallePedidoService } from '../services/detalle-pedido.service';
import { DetallePedidoController } from '../controllers/detalle-pedido.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DetallePedido])],
  controllers: [DetallePedidoController],
  providers: [DetallePedidoService],
})
export class DetallePedidoModule {}
