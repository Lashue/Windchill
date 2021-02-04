import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';

@Component({
  selector: 'app-information',
  templateUrl: 'information.page.html',
  styleUrls: ['information.page.scss'],
})
export class InformationPage {

  tInput: HTMLInputElement;
  wInput: HTMLInputElement;

  constructor(private router: Router) {

  }

  onHomeClicked(){
    this.router.navigate(['home']);
  }

}
