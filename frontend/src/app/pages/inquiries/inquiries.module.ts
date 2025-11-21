import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InquiriesPageRoutingModule } from './inquiries-routing.module';

import { InquiriesPage } from './inquiries.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InquiriesPageRoutingModule
  ],
  declarations: [InquiriesPage]
})
export class InquiriesPageModule {}
