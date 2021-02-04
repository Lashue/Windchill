import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tInput: HTMLInputElement;
  wInput: HTMLInputElement;

  constructor(private router: Router) {

  }

  onCalculateClicked(){
    this.tInput = <HTMLInputElement> document.getElementById("temperatur");
    this.wInput = <HTMLInputElement> document.getElementById("windgeschwindigkeit");

    let t = this.tInput.value;
    let w = this.wInput.value;
    let NavigationExtras: NavigationExtras ={
      queryParams:{
        Temperatur: t,
        Windgeschwindigkeit: w
      }
    }
    console.log(NavigationExtras);
    this.router.navigate(['result'], NavigationExtras);
  }
  onSavedClicked(){
    this.router.navigate(['saved']);
  }
  onInformationClicked(){
    this.router.navigate(['information']);
  }

}
