import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { InquiryService } from '../../services/inquiry.service';
import { CustomerService } from '../../services/customer.service';
import { CarService } from '../../services/car-service';

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.page.html',
  styleUrls: ['./inquiries.page.scss'],
  standalone: false,
})
export class InquiriesPage implements OnInit {
  inquiries:any[] = [];
  customers:any[] = [];
  cars:any[] = [];
  editId:number|null = null;

  form = this.fb.group({
    customerId: [null, Validators.required],
    carId: [null, Validators.required],
    message: ['', Validators.required],
    status: ['new', Validators.required]
  });

  constructor(
    private fb:FormBuilder,
    private api:InquiryService,
    private customersApi:CustomerService,
    private carsApi:CarService,
    private alert:AlertController
  ) {}

  ngOnInit(){ 
    this.loadLists(); 
    this.load();
  }

  load(){ this.api.getAll().subscribe((r:any)=> this.inquiries = r || []); }
  loadLists(){
    this.customersApi.getAll().subscribe((r:any)=> this.customers = r || []);
    this.carsApi.getCars().subscribe((r:any)=> this.cars = r || []);
  }

  submit(){
    if(this.form.invalid) return;
    const body = this.form.value as any;
    const req = this.editId ? this.api.update(this.editId, body) : this.api.create(body);
    req.subscribe(()=>{ this.reset(); this.load(); });
  }

  edit(i:any){ this.editId = i.id; this.form.patchValue({
    customerId: i.customerId, carId: i.carId, message: i.message, status: i.status
  }); window.scrollTo({top:0,behavior:'smooth'}); }

  async confirmDelete(i:any){
    const a = await this.alert.create({
      header:'Delete inquiry?',
      message:`¿Estás seguro de que deseas eliminarlo?`,
      buttons:[
        {text:'Cancel', role:'cancel'},
        {text:'Delete', role:'destructive', handler:()=> this.api.delete(i.id).subscribe(()=> this.load())}
      ]
    });
    await a.present();
  }

  cancel(){ this.reset(); }
  reset(){ this.editId = null; this.form.reset({ customerId:null, carId:null, message:'', status:'new' }); }
}

