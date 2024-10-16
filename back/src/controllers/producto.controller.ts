import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ProductoService } from 'src/services/producto.service';
import { Producto } from '../entities/producto.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateProductoDto } from 'src/dto/create-producto.dto';
import { UpdateProductoDto } from 'src/dto/update-producto.dto';

@ApiTags('productos') // Agrupa los endpoints bajo 'productos'
@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente', type: Producto })
  async create(@Body() createProductoDto: CreateProductoDto): Promise<Producto> {
    return this.productoService.create(createProductoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos', type: [Producto] })
  async findAll(): Promise<Producto[]> {
    return this.productoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto encontrado', type: Producto })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async findOne(@Param('id') id: number): Promise<Producto> {
    return this.productoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto' })
  @ApiResponse({ status: 200, description: 'Producto actualizado', type: Producto })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async update(@Param('id') id: number, @Body() updateProductoDto: UpdateProductoDto): Promise<Producto> {
    return this.productoService.update(id, updateProductoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiResponse({ status: 204, description: 'Producto eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.productoService.remove(id);
  }
}
