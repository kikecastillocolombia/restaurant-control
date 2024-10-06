import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from '../entities/pedido.entity';
import { PedidoService } from '../services/pedido.service';
import { PedidoController } from '../controllers/pedido.controller';
import { DetallePedido } from '../entities/detalle-pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, DetallePedido])],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
