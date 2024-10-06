import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Plato } from './plato.entity';

@Entity()
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, pedido => pedido.detalles)
  pedido: Pedido;

  @ManyToOne(() => Plato, plato => plato.detalles)
  plato: Plato;

  @Column()
  cantidad: number;
}
