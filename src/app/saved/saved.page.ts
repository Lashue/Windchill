import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';

@Component({
  selector: 'app-saved',
  templateUrl: 'saved.page.html',
  styleUrls: ['saved.page.scss'],
})
export class SavedPage {

  tInput: HTMLInputElement;
  wInput: HTMLInputElement;

  constructor(private router: Router) {

  }

  onHomeClicked(){
    this.router.navigate(['home']);
  }

}
