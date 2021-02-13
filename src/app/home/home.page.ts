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

  onCalculateClicked() {
    this.tInput = <HTMLInputElement>document.getElementById("temperatur");
    this.wInput = <HTMLInputElement>document.getElementById("windgeschwindigkeit");

    let t = this.tInput.value;
    let w = this.wInput.value;
    if (t != "" && w != "") {
      if (<number><unknown>w >= 0) { //es gibt keine negativen Windgeschwindigkeiten
        if (<number><unknown>w >= 408 || <number><unknown>t >= 57 || <number><unknown>t <= -94) {    // ~ höchsten/niedrigsten Temperaturen/Windgeschwindigkeit, die auf der Welt gemessen wurden
          this.showPopUpEingabeUnrealistisch(t, w);
        } else {
          let NavigationExtras: NavigationExtras = {
            queryParams: {
              Temperatur: t,
              Windgeschwindigkeit: w,
            }
          }
          this.router.navigate(['result'], NavigationExtras);

        }
      } else {
        this.showPopUpEingabeNegativ();
      }
    } else {
      this.showPopUpEingabeFehlt();
    }
  }

  onSavedClicked() {
    this.router.navigate(['saved']);
  }

  onInformationClicked() {
    this.router.navigate(['information']);
  }

  showPopUpEingabeFehlt() {
    const alert = document.createElement('ion-alert');
    alert.header = "Eingabe Fehlt";
    alert.message = "Temperatur und Windgeschwindigkeit müssen einen Wert haben.";
    alert.buttons = ['OK'];
    document.body.appendChild(alert);
    return alert.present();
  }

  showPopUpEingabeNegativ() {
    const alert = document.createElement('ion-alert');
    alert.header = "Eingabe negativ";
    alert.message = "Die Windgeschwindigkeit darf keinen negativen Wert haben.";
    alert.buttons = ['OK'];
    document.body.appendChild(alert);
    return alert.present();
  }
  showPopUpEingabeUnrealistisch(t, w) {
    const alert = document.createElement('ion-alert');
    alert.header = "Eingabe unrealistisch";
    alert.message = "Die Eingabe entspricht einem noch nie auf der Erde gemessenen Wert.";
    alert.buttons = ['OK',
      {
        text: "Trotzdem fortfahren",
        handler: () => {
          let NavigationExtras: NavigationExtras = {
            queryParams: {
              Temperatur: t,
              Windgeschwindigkeit: w,
            }
          }          
          this.router.navigate(['result'], NavigationExtras);
        }
      },];
    document.body.appendChild(alert);
    return alert.present();
  }
}
