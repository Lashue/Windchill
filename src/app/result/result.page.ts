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
  eText: HTMLTextAreaElement;
  wText: HTMLTextAreaElement;
  tText: HTMLTextAreaElement;

  data: any;

  constructor(private route: ActivatedRoute, private router: Router) {

    this.route.queryParams.subscribe(params => {
      //console.log(params);

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
    console.log(this.windchill);
  }

  setResult(){
    this.eText = <HTMLTextAreaElement> document.getElementById("ergebnisFeld"); 
    this.wText = <HTMLTextAreaElement> document.getElementById("windgeschwindigkeitFeld"); 
    this.tText = <HTMLTextAreaElement> document.getElementById("TemperaturFeld"); 
    this.eText.innerHTML = this.windchill;
    this.wText.innerHTML = this.windgeschwindigkeit;
    this.tText.innerHTML = this.temperatur;
  }

  onBackClicked(){
    this.router.navigate(['home']);
  }

  onSaveClicked(){
    var date = new Date();
    var dateString =  date.getDate() + "." + date.getMonth() + "." + date.getFullYear() 
    let NavigationExtras: NavigationExtras ={
      queryParams:{
        Temperatur: this.temperatur,
        Windgeschwindigkeit: this.windgeschwindigkeit,
        Windchill: this.windchill,
        DateSaved: dateString,
        note: ""
      }
    }
    this.router.navigate(['saved'], NavigationExtras);
  }

}
