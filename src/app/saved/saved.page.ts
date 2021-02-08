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
      if(this.getSavedDataById("sId" + params.Windchill) == null){     //Windchill mus noch gerundet werden
        this.addSavedData(params, "sId" + params.Windchill);
      }

    })
  }

  ngOnInit(){
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
    var contentList = document.getElementById("savedList");
    contentList.innerHTML = "";
    var list = document.createElement("ion-list");
    contentList.appendChild(list);
    
    /*var listElement = document.createElement("ion-item");
    var listElementLabel = document.createElement("ion-label");
    listElementLabel.innerHTML = "test";
    listElement.appendChild(listElementLabel);
    list.appendChild(listElement);*/

    this.storage.forEach((v,k)=>{
      var listElement = document.createElement("ion-item");
      list.appendChild(listElement);
      const data = new NavParams(v);
      var itemId = "item" + k;
      listElement.innerHTML = "<IonItem id=" + itemId + "><IonLabel> Windgeschwindigkeit: " + data.get("Windgeschwindigkeit") + "</IonLabel><IonLabel> Temperatur: " + data.get("Temperatur") + "</IonLabel><IonLabel> Windchill: " + data.get("Windchill") + "</IonLabel></IonItem>";
      
      var delButton = document.createElement("ion-button");
      var listItem = document.getElementById("item" + k);
      listItem.appendChild(delButton);
      delButton.addEventListener("click", (event: CustomEvent) => {this.deleteSavedDataById(k);});
      console.log('value',v);
      console.log('key',k);          
    })
  }

  createContentElement(){
    
  }

}
