import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: 'result.page.html',
  styleUrls: ['result.page.scss'],
})
export class ResultPage implements OnInit{

  windgeschwindigkeit;
  temperatur;
  windchill;
  eText: HTMLTextAreaElement;
  data: any;

  constructor(private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      //console.log(params);

        this.data = params;
        this.temperatur = this.data.Temperatur;
        this.windgeschwindigkeit = this.data.Windgeschwindigkeit;
    }
    )
  }
  
  ngOnInit(){
    console.log(this.data);
    this.eText = <HTMLTextAreaElement> document.getElementById("ergebnisFeld"); 
    this.eText.textContent = "asdfljhsdl";
    this.calculateWindChill();

  }

  calculateWindChill(){
    this.windchill = 13.12 + 0.6215 * this.temperatur - 11.37 * Math.pow(this.windgeschwindigkeit, 0.16) + 0.3965 * this.temperatur * Math.pow(this.windgeschwindigkeit, 0.16);
    //this.windchill = Math.pow(this.windgeschwindigkeit, 0.16);
    //console.log(this.windgeschwindigkeit);
    console.log(this.windchill);
  }

  setResult(){
    this.eText = <HTMLTextAreaElement> document.getElementById("ergebnisFeld"); 
    this.eText.value = "asdfljhsdl";
  }

  onBackClicked(){
    this.calculateWindChill();
  }

}
