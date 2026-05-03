import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Body,
  Delete,
} from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number) {
    console.log({ id: id });
    // throw new Error('Auxilio error no controlado en mi backend');
    const carName = this.carsService.findById(id);
    return { carName };
  }

  @Post()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  createCar(@Body() body: any) {
    // return {
    //   ok: true,
    //   method: 'POST',
    // };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return body;
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
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return {
      method: 'delete',
      id,
    };
  }
}
