import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Producto } from './producto.entity'; // Cambiado de Plato a Producto

@Entity()
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, pedido => pedido.detalles)
  pedido: Pedido;

  @ManyToOne(() => Producto, producto => producto.detalles) // Cambiado de Plato a Producto
  producto: Producto; // Cambiado de plato a producto

  @Column()
  cantidad: number;
}
