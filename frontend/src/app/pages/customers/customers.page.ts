import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
  standalone: false,
})
export class CustomersPage implements OnInit {
  customers:any[] = [];
  editId:number|null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required]
  });

  constructor(private fb:FormBuilder, private api:CustomerService, private alert:AlertController) {}

  ngOnInit(){ this.load(); }

  load(){ this.api.getAll().subscribe((r:any)=> this.customers = r || []); }

  submit(){
    if(this.form.invalid) return;
    const body = this.form.value as any;
    const req = this.editId ? this.api.update(this.editId, body) : this.api.create(body);
    req.subscribe(()=>{ this.reset(); this.load(); });
  }

  edit(c:any){ this.editId = c.id; this.form.patchValue(c); window.scrollTo({top:0,behavior:'smooth'}); }

  async confirmDelete(c:any){
    const a = await this.alert.create({
      header:'Delete customer?',
      message:`¿Estás seguro de que deseas eliminarlo?`,
      buttons:[
        {text:'Cancel', role:'cancel'},
        {text:'Delete', role:'destructive', handler:()=> this.api.delete(c.id).subscribe(()=> this.load())}
      ]
    });
    await a.present();
  }

  cancel(){ this.reset(); }
  reset(){ this.editId = null; this.form.reset({name:'', email:'', phone:''}); }
}

