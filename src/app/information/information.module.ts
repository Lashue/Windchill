import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { InformationPage } from './information.page';

import { InformationPageRoutingModule } from './information-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformationPageRoutingModule
  ],
  declarations: [InformationPage]
})
export class InformationPageModule {}
