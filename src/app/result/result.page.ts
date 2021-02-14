import { Component, OnInit } from '@angular/core';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: 'result.page.html',
  styleUrls: ['result.page.scss'],
})
export class ResultPage {

  windgeschwindigkeit;
  temperatur;
  windchill;
  notiz;
  eText: HTMLIonTextElement;
  wText: HTMLIonTextElement;
  tText: HTMLIonTextElement;

  data: any;

  constructor(private route: ActivatedRoute, private router: Router) {

    this.route.queryParams.subscribe(params => {
        this.data = params;
        this.temperatur = this.data.Temperatur;
        this.windgeschwindigkeit = this.data.Windgeschwindigkeit;
        this.calculateWindChill();
        this.setResult();
    })
  }


  calculateWindChill(){
    this.windchill = 13.12 + 0.6215 * this.temperatur - 11.37 * Math.pow(this.windgeschwindigkeit, 0.16) + 0.3965 * this.temperatur * Math.pow(this.windgeschwindigkeit, 0.16);
    this.windchill = Math.round (this.windchill * 100) / 100; 
  }

  setResult(){
    this.eText = <HTMLIonTextElement> document.getElementById("ergebnisFeld"); 
    this.wText = <HTMLIonTextElement> document.getElementById("windgeschwindigkeitFeld"); 
    this.tText = <HTMLIonTextElement> document.getElementById("TemperaturFeld"); 
    this.eText.innerHTML = this.windchill;
    this.wText.innerHTML = "Windgeschwindigkeit: " + this.windgeschwindigkeit + "km/h";
    this.tText.innerHTML = "Temperatur: " + this.temperatur + "°C";
  }

  onHomeClicked(){
    this.router.navigate(['home']);
  }

  onSaveClicked(){
    const alert = document.createElement('ion-alert');

      alert.header = "Windchill: ";
      alert.message = 'Windgeschwindigkeit: ' + this.windgeschwindigkeit + "\n Temperatur: " + this.temperatur;

   alert.inputs = [
     {
      name: "note", 
      placeholder: "Notiz",
       
     }
   ]

    alert.buttons = ['back', {
      text: "Save",
      handler: (saveData) => {
        this.notiz = saveData.note;
        this.routeToSaved();
      }
    }];
  
    document.body.appendChild(alert);
    return alert.present();
  }

  routeToSaved(){
    var date = new Date();
    var dateString =  date.getDate() + "." + date.getMonth() + "." + date.getFullYear() 
    let NavigationExtras: NavigationExtras ={
      queryParams:{
        Temperatur: this.temperatur,
        Windgeschwindigkeit: this.windgeschwindigkeit,
        Windchill: this.windchill,
        DateSaved: dateString,
        note: this.notiz
      }
    }
    this.router.navigate(['saved'], NavigationExtras);
  }

}
