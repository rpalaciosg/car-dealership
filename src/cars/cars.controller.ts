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
  // UsePipes,
  // ValidationPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
// @UsePipes(ValidationPipe) //--> este es validation pipe a nivel de clase
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
  createCar(@Body() createCarDto: CreateCarDto) {
    // return createCarDto;
    return this.carsService.create(createCarDto);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Patch(':id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return updateCarDto;
  }

  @Delete(':id')
  deleteCar(@Param('id') id: string) {
    return {
      method: 'delete',
      id,
    };
  }
}
