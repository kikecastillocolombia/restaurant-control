import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Usuario } from './usuario.entity';
import { DetallePedido } from './detalle-pedido.entity';
import { Mesa } from './mesa.entity';
import { Cuenta } from './cuenta.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @Column()
  estado: string; // 'pendiente', 'listo', 'facturado'

  @ManyToOne(() => Usuario, usuario => usuario.pedidos)
  usuario: Usuario; // Mesero que registró el pedido

  @ManyToOne(() => Mesa, mesa => mesa.pedidos)
  mesa: Mesa; // Mesa donde se realizó el pedido

  @OneToMany(() => DetallePedido, detalle => detalle.pedido)
  detalles: DetallePedido[];

  @OneToOne(() => Cuenta, cuenta => cuenta.pedido)
  cuenta: Cuenta; // Relación con Cuenta
}
