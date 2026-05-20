import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    { id: uuid(), brand: 'Toyota', model: 'Corolla' },
    { id: uuid(), brand: 'Honda', model: 'Civic' },
    { id: uuid(), brand: 'Ford', model: 'Focus' },
    { id: uuid(), brand: 'Jeep', model: 'Wrangler' },
  ];

  public findAll() {
    return this.cars;
  }

  public findById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with ID '${id}' not found.`);
    return car;
  }

  public create(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      // model: createCarDto.model,
      // brand: createCarDto.brand,
      ...createCarDto,
    };
    this.cars.push(car);
    return car;
  }

  public update(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findById(id);

    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException(`Car id is not valid inside body`);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = { ...carDB, ...updateCarDto, id };
        // carDB = {
        //   id,
        //   brand: updateCarDto.brand ?? car.brand,
        //   model: updateCarDto.model ?? car.model
        // };
        return carDB;
      }
      return car;
    });
    return carDB; // carro actualizado
  }

  public delete(id: string): void {
    this.findById(id);
    this.cars.filter((car) => car.id !== id);
    return;
  }
}
