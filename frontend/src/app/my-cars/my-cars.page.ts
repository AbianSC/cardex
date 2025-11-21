import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController, IonicSafeString } from '@ionic/angular';
import { CarService } from '../services/car-service';

@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.page.html',
  styleUrls: ['./my-cars.page.scss'],
  standalone: false,
})
export class MyCarsPage implements OnInit {
  cars: any[] = [];
  filteredCars: any[] = [];           // ← lista filtrada para la vista
  editId: number | null = null;
  selected: any | null = null;

  form = this.fb.group({
    brand: ['', Validators.required],
    model: ['', Validators.required],
    color: ['', Validators.required],
    year: [2020, Validators.required],
    mileage: [0, Validators.required],
    licensePlate: ['', Validators.required],
  });

  constructor(
    private carService: CarService,
    private fb: FormBuilder,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() { this.load(); }

  load(event?: any) {
    this.carService.getCars().subscribe({
      next: (res: any) => {
        this.cars = res || [];
        this.filteredCars = this.cars;     // inicia mostrando todo
        event?.target?.complete?.();
      },
      error: _ => event?.target?.complete?.()
    });
  }

  // --- Create / Update ---
  submit() {
    if (this.form.invalid) return;
    const payload = this.form.value as any;

    if (this.editId) {
      this.carService.updateCar(this.editId, payload).subscribe(() => {
        this.reset(); this.load();
      });
    } else {
      this.carService.createCar(payload).subscribe(() => {
        this.reset(); this.load();
      });
    }
  }

  edit(c: any) {
    this.editId = c.id;
    this.form.patchValue(c);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- Delete con confirmación (negrita en el mensaje) ---
  async confirmRemove(c: any) {
    const msg = new IonicSafeString(
      `Are you sure you want to delete <strong>${c.brand} ${c.model} (${c.licensePlate})</strong>?`
    );

    const alert = await this.alertCtrl.create({
      header: 'Delete car?',
      message: msg,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Delete', role: 'destructive', handler: () => this.deleteCar(c.id) }
      ]
    });
    await alert.present();
  }

  private deleteCar(id: number) {
    this.carService.deleteCar(id).subscribe(() => this.load());
  }

  // Compatibilidad si en algún sitio se llama aún a remove(id)
  remove(id: number) {
    this.carService.deleteCar(id).subscribe(() => this.load());
  }

  // --- Detalle ---
  show(c: any) { this.selected = c; }
  closeDetail() { this.selected = null; }

  // --- Cancelar edición y resetear form ---
  cancelEdit() { this.reset(); }
  private reset() {
    this.editId = null;
    this.form.reset({ brand:'', model:'', color:'', year:2020, mileage:0, licensePlate:'' });
  }

  // --- Búsqueda local (marca, modelo, matrícula) ---
  onSearch(ev: any) {
    const term = (ev?.target?.value || '').trim();
    if (!term) { this.filteredCars = this.cars; return; }
    const q = this.normalize(term);
    this.filteredCars = this.cars.filter(c =>
      this.normalize(c.brand).includes(q) ||
      this.normalize(c.model).includes(q) ||
      this.normalize(c.licensePlate).includes(q)
    );
  }

  private normalize(s: string) {
    return (s || '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
}



