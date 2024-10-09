import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Usuario } from './usuario.entity';
import { DetallePedido } from './detalle-pedido.entity';
import { Mesa } from './mesa.entity';
import { Cuenta } from './cuenta.entity';
import { EstadoPedido } from '../enums/estado-pedido.enum'; // Asegúrate de importar el enum

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @Column({
    type: 'enum',
    enum: EstadoPedido,
    default: EstadoPedido.PENDIENTE, // Valor por defecto
  })
  estado: EstadoPedido; // Ahora usaremos el enum EstadoPedido

  @ManyToOne(() => Usuario, usuario => usuario.pedidos)
  usuario: Usuario;

  @Column({ nullable: true }) // Agrega esta línea para permitir que sea nulo
  usuarioId: number; // Agregar esta propiedad para facilitar el manejo de usuario

  @ManyToOne(() => Mesa, mesa => mesa.pedidos)
  mesa: Mesa;

  @OneToMany(() => DetallePedido, detalle => detalle.pedido)
  detalles: DetallePedido[];

  @OneToOne(() => Cuenta, cuenta => cuenta.pedido)
  cuenta: Cuenta;
}
