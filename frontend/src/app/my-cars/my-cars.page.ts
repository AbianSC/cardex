import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CarService } from '../services/car-service';

@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.page.html',
  styleUrls: ['./my-cars.page.scss'],
  standalone: false,
})
export class MyCarsPage implements OnInit {
  cars: any[] = [];
  editId: number | null = null;
  selected: any | null = null;

  form = this.fb.group({
    brand: ['', Validators.required],
    model: ['', Validators.required],
    color: ['', Validators.required],
    year: [0, Validators.required],
    mileage: [0, Validators.required],
    licensePlate: ['', Validators.required],
  });

  constructor(private carService: CarService, private fb: FormBuilder) {}

  ngOnInit() { this.load(); }

  // Equivalente a tu getAllCars()
  load(event?: any) {
    this.carService.getCars().subscribe({
      next: (res: any) => { this.cars = res || []; event?.target?.complete?.(); },
      error: _ => event?.target?.complete?.()
    });
  }

  submit() {
    if (this.form.invalid) return;
    const payload = this.form.value as any;

    if (this.editId) {
      this.carService.updateCar(this.editId, payload).subscribe(() => { this.reset(); this.load(); });
    } else {
      this.carService.createCar(payload).subscribe(() => { this.reset(); this.load(); });
    }
  }

  edit(c: any) {
    this.editId = c.id;
    this.form.patchValue(c);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  remove(id: number) {
    this.carService.deleteCar(id).subscribe(() => this.load());
  }

  show(c: any) { this.selected = c; }
  closeDetail() { this.selected = null; }
  cancelEdit() { this.reset(); }

  private reset() {
    this.editId = null;
    this.form.reset({ brand:'', model:'', color:'', year:2020, mileage:0, licensePlate:'' });
  }
}


