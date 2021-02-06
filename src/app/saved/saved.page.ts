import { Component, Input, ViewChild } from '@angular/core';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-saved',
  templateUrl: 'saved.page.html',
  styleUrls: ['saved.page.scss'],
})
export class SavedPage {

  idInput: HTMLInputElement;
  //list: HTMLElement;

  lastStorageId:number = 0;

  constructor(private route: ActivatedRoute, private router: Router, private storage: Storage) {
    this.route.queryParams.subscribe(params => {
        this.addSavedData(params, this.lastStorageId++);
    })
  }

  

  addSavedData(data:any, storageId: any){
    this.storage.set(storageId, data)

  }

  getSavedData(){
    this.idInput = <HTMLInputElement> document.getElementById("inputId");
    this.getSavedDataById(this.idInput.value);
  }

  getSavedDataById(id:any){
    this.storage.get(id).then((val) => {
      console.log(val);
    });
  }
  deleteSavedData(){
    this.idInput = <HTMLInputElement> document.getElementById("inputId");
    this.deleteSavedDataById(this.idInput.value);
  }

  deleteSavedDataById(id:any){
    this.storage.remove(id);
  }

  onHomeClicked(){
    this.router.navigate(['home']);
  }

  createContent(){
    //var list = document.createElement("ion-list");

    this.storage.forEach((v,k)=>{
      console.log('value',v);
      console.log('key',k);          
    })


  }

  createContentElement(){
    
  }

}
