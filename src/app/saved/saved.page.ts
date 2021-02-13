import { normalizeGenFileSuffix } from '@angular/compiler/src/aot/util';
import { Component, Input, ViewChild } from '@angular/core';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { Storage } from '@ionic/storage';
import { Button } from 'protractor';


@Component({
  selector: 'app-saved',
  templateUrl: 'saved.page.html',
  styleUrls: ['saved.page.scss'],
})
export class SavedPage {

  idInput: HTMLInputElement;
  //list: HTMLElement;


  constructor(private route: ActivatedRoute, private router: Router, private storage: Storage) {
    this.route.queryParams.subscribe(params => {
      if(params.Windchill != null){
        if (this.getSavedDataById("sId" + params.Windchill) == null) { 
          this.addSavedData(params, "sId" + params.Windchill);
        }
      }
    })
  }

  ionViewDidEnter(){
    this.createContent();
  }

  addSavedData(data:any, storageId: any){
    this.storage.set(storageId, data)

  }

  getSavedData(){
    this.idInput = <HTMLInputElement> document.getElementById("inputId");
    this.getSavedDataById(this.idInput.value);
  }

  getSavedDataById(id:any) : any{
    this.storage.get(id).then((val) => {
      console.log("Data:");
      console.log(val);
      return val;
    });
  }
  deleteSavedData(){
    this.storage.clear();
    this.createContent();
  }

  deleteSavedDataById(id:any){
    this.storage.remove(id);
    this.createContent();
  }

  onHomeClicked(){
    this.router.navigate(['home']);
  }

  createContent(){
    //var list = document.createElement("ion-list");
    var list = document.getElementById("listSavedData");
    list.innerHTML = "";
    //var list = document.createElement("ion-list");
    //contentList.appendChild(list);

    this.storage.forEach((v,k)=>{
      var listElement = document.createElement("ion-grid");

      list.appendChild(listElement);
      
      listElement.style.backgroundColor = "#248ef1";
      listElement.style.margin = "0.5em";
      listElement.style.borderRadius = "6px 6px 6px 6px";
      var data = new NavParams(v);
      var itemId = "item" + k;
      listElement.id = itemId;

      var listItemRowLeft = document.createElement("ion-row");
      listElement.appendChild(listItemRowLeft);
      var listElementText = document.createElement("ion-grid");
      listElementText.style.width = "75%";
      if(data.get("note") != ""){
        listElementText.innerHTML = "<ion-row><ion-col> <ionlabel style='font-size: 1.3rem'> Windchill: " + data.get("Windchill") + " </ionlabel></ion-col></ion-row><ion-row> <ion-col> <ionlabel style='font-size: 0.85rem'> Windgeschwindigkeit: " + data.get("Windgeschwindigkeit") + " km/h </ionlabel></ion-col></ion-row><ion-row><ion-col> <ionlabel style='font-size: 0.85rem'> Temperatur: " + data.get("Temperatur") + " °C</ionlabel></ion-col></ion-row><ion-row><ion-col> <ionlabel style='font-size: 0.7rem' id='note" + k + "'> Notiz: " + data.get("note") + " </ionlabel></ion-col></ion-row>";
      }else{
        listElementText.innerHTML = "<ion-row><ion-col> <ionlabel style='font-size: 1.3rem'> Windchill: " + data.get("Windchill") + " </ionlabel></ion-col></ion-row><ion-row> <ion-col> <ionlabel style='font-size: 0.85rem'> Windgeschwindigkeit: " + data.get("Windgeschwindigkeit") + " km/h </ionlabel></ion-col></ion-row><ion-row><ion-col> <ionlabel style='font-size: 0.85rem'> Temperatur: " + data.get("Temperatur") + " °C</ionlabel></ion-col></ion-row><ion-row><ion-col> <ionlabel style='font-size: 0.7rem' id='note" + k + "'> Notiz:</ionlabel></ion-col></ion-row>";
      }
      listItemRowLeft.appendChild(listElementText);
      var delButton = document.createElement("ion-button");
      
      listElement.addEventListener("click", (event: CustomEvent) => {this.showPopUp(k);});
    })
  }

  showPopUp(id:any){
    const alert = document.createElement('ion-alert');
    var data2 = this.storage.get(id).then((val) => {
      alert.header = "Windchill: " + val.Windchill;
      
      alert.subHeader = "gespeichert am: " + val.DateSaved;
      alert.message = 'Windgeschwindigkeit: ' + val.Windgeschwindigkeit + "\n Temperatur: " + val.Temperatur;
      alert.inputs = [
        {
         name: "note", 
         value: val.note
        }
      ]
    });;
   

    alert.buttons = [
      {
        text: "OK",
        handler:(saveNote) =>{
          this.storage.get(id).then((val) => {
            val.note = saveNote.note;
            this.storage.set(id, val);
            document.getElementById("note" + id).innerHTML = "Notiz: " + val.note;
          });

        }
      }, 
       {
      text: "Delete",
      cssClass: 'warning',
      handler: () => {
        this.deleteSavedDataById(id);
      }
    }];
  
    document.body.appendChild(alert);
    return alert.present();

  }

  createContentElement(){
    
  }

}
