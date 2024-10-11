import { DataSource } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { Pedido } from './entities/pedido.entity';
import { Plato } from './entities/plato.entity';
import { DetallePedido } from './entities/detalle-pedido.entity';
import { Cuenta } from './entities/cuenta.entity';
import { Mesa } from './entities/mesa.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost', 
  port: 5432,
  username: 'postgres', 
  password: 'admin',
  database: 'postgres', 
  entities: [Usuario, Pedido, Plato, DetallePedido, Cuenta, Mesa],
  synchronize: true, // No usar en producción
});
