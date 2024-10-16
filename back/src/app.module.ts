import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './typeorm.config';
import { PedidoModule } from './modules/pedido.module';
import { UsuarioModule } from './modules/usuario.module';
import { ProductoModule } from './modules/producto.module';
import { MesaModule } from './modules/mesa.module';
import { DetallePedidoModule } from './modules/detalle-pedido.module';
import { CuentaModule } from './modules/cuenta.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    PedidoModule,
    UsuarioModule,
    ProductoModule,
    MesaModule,
    DetallePedidoModule,
    CuentaModule
  ],
})
export class AppModule {}
