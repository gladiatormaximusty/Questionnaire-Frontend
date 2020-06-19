/**
 * Created by Administrator on 2017/3/17.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class StroageService{

  public setStroage (name:string,value:any):void{
    localStorage.setItem(name,value);
  }

  public getStroage(name:string):string{
    return localStorage.getItem(name);
  }

  public clear(name?:string):void{
    if(!!name){
      localStorage.removeItem(name);
    }else {
      localStorage.clear();
    }
  }

  public setSessionStorge (name:string,value:any):void{
    sessionStorage.setItem(name,value);
  }

  public getSessionStorge(name:string):string{
    return sessionStorage.getItem(name);
  }
}
