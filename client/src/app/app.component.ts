
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { ServiceHandler } from './servicehandler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

  loginForm: FormGroup
  listForm:FormGroup
  cardForm:FormGroup
  public story;
  public isDisplay = true;
  public isError = false;
  public isPrint=false;
  public error: string;
  public storyFields = ["key","fields.summary","fields.customfield_10232"];
  public userstoryColorValue;subtaskColorValue;defectColorValue;

  public resolveFieldValue(issue, sourceArray, position){
    var data = sourceArray[position] as string;
   return this.resolveFieldValueFromString(issue,data);    
  }

  public resolveFieldValueFromString(issue,sourceString)
  {
    var dataarray = sourceString.split('.');
    var returnValue = issue;
    var i;
    for (i=0;i < dataarray.length; i++ )
    { returnValue= returnValue[dataarray[i]]}
    return returnValue;
  }
  constructor(private _serviceHandler: ServiceHandler, private formBuilder: FormBuilder) {
    this.createForm();
    this.createListForm();
    this.createCardForm();
  }

  onPrint()
  {
    window.print();
  }
  onSubmit() {
    this.isDisplay = false;
    this.isError = false;
    this._serviceHandler.username = this.loginForm.controls.username.value;
    this._serviceHandler.password = this.loginForm.controls.password.value;

    this._serviceHandler.searchJql(this.loginForm.controls.url.value, this.loginForm.controls.jql.value).subscribe(
      data => { this.story = data ; },
      err => {
        this.errorMessage(err);
      }
    );
    
  }
onAdd(){
  this.storyFields.push(this.listForm.controls.addfield.value);
  this.listForm.reset();
}
onGenerate(){
  this.userstoryColorValue = this.cardForm.controls.userstoryColor.value;
  this.subtaskColorValue = this.cardForm.controls.subtaskColor.value;
  this.defectColorValue = this.cardForm.controls.defectColor.value;
 this.isPrint=true;
}
  ngOnInit() {
  }
  createForm() {
    this.loginForm = this.formBuilder.group({
      url: ['', Validators.compose([
        Validators.required, Validators.pattern("^(https?:\/\/).*")
      ])],
      username: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
      jql: ['', Validators.compose([
        Validators.required
      ])]
    })
  }

  createListForm() {
    this.listForm = this.formBuilder.group({
      addfield: ['',{}]
    })
  }

  createCardForm() {
    this.cardForm = this.formBuilder.group({
      userstoryColor: ['#20ECF0',{}],
      subtaskColor: ['#17C65D',{}],
      defectColor: ['#DA2433',{}]
    })
  }
  private errorMessage(err: any) {
    this.error = err.message as string;
    this.isDisplay = true;
    this.isError = true;
  }
}

