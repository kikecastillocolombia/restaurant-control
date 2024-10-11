import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Rol } from '../dto/create-usuario.dto';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ unique: true })
  @Index()  // Añadimos un índice para el email, útil para búsquedas rápidas
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Rol })
  rol: Rol;  // Usamos el enum definido en el DTO para roles consistentes

  @OneToMany(() => Pedido, pedido => pedido.usuario)
  pedidos: Pedido[];
}
