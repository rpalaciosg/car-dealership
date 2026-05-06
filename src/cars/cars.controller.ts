import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Body,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseUUIDPipe) id: string) {
    console.log({ id: id });
    // throw new Error('Auxilio error no controlado en mi backend');
    const carName = this.carsService.findById(id);
    return { carName };
  }

  @Post()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  createCar(@Body() createCarDto: CreateCarDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return createCarDto;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Patch(':id')
  updateCar(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: any,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return body;
  }

  @Delete(':id')
  deleteCar(@Param('id') id: string) {
    return {
      method: 'delete',
      id,
    };
  }
}
