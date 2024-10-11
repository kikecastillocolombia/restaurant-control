import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cuenta } from '../entities/cuenta.entity';
import { CreateCuentaDto } from 'src/dto/create-cuenta.dto';
import { CuentaResponseDto } from 'src/dto/cuenta-response.dto';
import { Pedido } from 'src/entities/pedido.entity';
import { DetallePedido } from '../entities/detalle-pedido.entity';
import { Plato } from '../entities/plato.entity';

@Injectable()
export class CuentaService {
  constructor(
    @InjectRepository(Cuenta)
    private readonly cuentaRepository: Repository<Cuenta>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(DetallePedido)
    private readonly detallePedidoRepository: Repository<DetallePedido>,
    @InjectRepository(Plato)
    private readonly platoRepository: Repository<Plato>,
  ) {}

  async create(createCuentaDto: CreateCuentaDto): Promise<Cuenta> {
    const cuentaExistente = await this.cuentaRepository.findOne({
      where: { pedido: { id: createCuentaDto.pedidoId } },
    });

    if (cuentaExistente) {
      // Actualiza la cuenta existente en lugar de crear una nueva
      cuentaExistente.pagado = createCuentaDto.pagado;
      return this.cuentaRepository.save(cuentaExistente);
    }

    // Si no existe, crea una nueva cuenta
    const cuenta = new Cuenta();
    cuenta.pagado = createCuentaDto.pagado;

    const pedido = await this.pedidoRepository.findOne({ where: { id: createCuentaDto.pedidoId } });
    if (!pedido) {
      throw new Error('Pedido no encontrado');
    }

    // Calcular el total basado en los detalles del pedido
    cuenta.total = await this.calcularTotal(pedido.id); // Llama al método calcularTotal
    cuenta.pedido = pedido; // Asigna el pedido a la cuenta
    return this.cuentaRepository.save(cuenta);
  }

  // Calcular el total de la cuenta basado en los detalles del pedido
  private async calcularTotal(pedidoId: number): Promise<number> {
    const detalles = await this.detallePedidoRepository.find({
      where: { pedido: { id: pedidoId } },
      relations: ['plato'],
    });

    if (!detalles.length) {
      throw new Error('No se encontraron detalles para este pedido.');
    }

    const total = detalles.reduce((acc, detalle) => {
      return acc + (detalle.cantidad * detalle.plato.precio); // Sumar el costo total
    }, 0);

    return total;
  }

  // Obtener todas las cuentas
  async findAll(): Promise<Cuenta[]> {
    return this.cuentaRepository.find({ relations: ['pedido'] });
  }

  // Obtener una cuenta por ID
  async findOne(id: number): Promise<Cuenta> {
    return this.cuentaRepository.findOne({ where: { id }, relations: ['pedido'] });
  }

  // Actualizar una cuenta
  async update(id: number, cuenta: Cuenta): Promise<Cuenta> {
    await this.cuentaRepository.update(id, cuenta);
    return this.findOne(id);
  }

  // Eliminar una cuenta
  async remove(id: number): Promise<void> {
    await this.cuentaRepository.delete(id);
  }

  // Agregar un plato a una cuenta
  async agregarPlatoACuenta(pedidoId: number, platoId: number) {
    const pedido = await this.pedidoRepository.findOne({ where: { id: pedidoId }, relations: ['cuenta'] });
    if (!pedido) throw new Error('Pedido no encontrado');
  
    const plato = await this.platoRepository.findOne({ where: { id: platoId } });
    if (!plato) throw new Error('Plato no encontrado');
  
    const detallePedido = new DetallePedido();
    detallePedido.pedido = pedido;
    detallePedido.plato = plato;
    detallePedido.cantidad = 1; // O cualquier lógica que uses para la cantidad
  
    await this.detallePedidoRepository.save(detallePedido);
  
    // Asegúrate de que plato.precio sea un número válido
    const precioPlato = parseFloat(plato.precio.toString().replace(',', '.'));
    if (isNaN(precioPlato)) {
      throw new Error(`El precio del plato con ID ${platoId} no es válido: ${plato.precio}`);
    }
  
    // Verificar y asegurar que el total de la cuenta sea un número
    const totalActual = parseFloat(pedido.cuenta.total.toString().replace(',', '.'));
    if (isNaN(totalActual)) {
      throw new Error(`El total de la cuenta no es un número válido: ${pedido.cuenta.total}`);
    }

    // Actualiza el total de la cuenta
    pedido.cuenta.total = parseFloat((totalActual + precioPlato).toFixed(2)); // Redondear a dos decimales
    await this.cuentaRepository.save(pedido.cuenta);
  
    // Guarda la cuenta actualizada
    await this.cuentaRepository.save(pedido.cuenta);
  }

  // Cobrar la cuenta
  async cobrarCuenta(cuentaId: number) {
    const cuenta = await this.cuentaRepository.findOne({ where: { id: cuentaId } });
    if (!cuenta) throw new Error('Cuenta no encontrada');

    cuenta.pagado = true;
    await this.cuentaRepository.save(cuenta);
  }

  private toResponseDto(cuenta: Cuenta): CuentaResponseDto {
    const responseDto = new CuentaResponseDto();
    responseDto.id = cuenta.id;
    responseDto.total = cuenta.total;
    responseDto.pagado = cuenta.pagado;
    responseDto.pedidoId = cuenta.pedido ? cuenta.pedido.id : null; // Asegúrate de tener la relación cargada
    return responseDto;
  }
}
