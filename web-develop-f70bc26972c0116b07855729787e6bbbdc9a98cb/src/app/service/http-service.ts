/**
 * Created by Administrator on 2017/3/17.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from '@angular/router';
import { StroageService } from './stroage';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
declare var alertify:any;
@Injectable()

export class HttpService{
  constructor(private http: HttpClient,
              private stroage: StroageService,
              private router:Router
  ) {
  }
  //设置请求头
  private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ this.stroage.getStroage('token')});

  /**
   *登录请求
   * @param data={"username": "string","password": "string"}
   * @returns string body
   */
  login(api:string,data:any):Promise<any>{
    let headers=new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(environment.baseUrl+api,JSON.stringify(data),{headers:headers})
      .toPromise()
      .then(response =>{
        let res:any=response;
        try {
          if(res._body){
            res=JSON.parse(res._body);
          }
        }catch (e){
          this.handleResponseCode(e);
        }
        return res;
      })
      .catch(error => {
        this.handleError(error)
      });
  }
  /**
   * 获取数据
   * @param api  string
   * @param data json
   * @returns {any|Promise<*|T>|Promise<*>|Promise<R>}
   */
  getData(api:string,data?:any): Promise<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer '+ this.stroage.getStroage('token') });
    let params = new HttpParams({ fromObject: data });
    return this.http.get(environment.baseUrl +api, { headers: headers, params})
      .toPromise()
      .then((response) =>{
        let res:any=response;
        try {
          if(res._body){
            res=JSON.parse(res._body);
          }
        }catch (e){
          this.handleResponseCode(e);
        }
        return res;
      })
      .catch(error => {
        this.handleError(error)
      });
  }
  /**
   * 提交数据
   * @param api  string
   * @param data json
   * @returns respone
   */
  postData(api:string,data:any):Promise<any>{
    let headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8','Authorization': 'Bearer '+ this.stroage.getStroage('token')});
    let body = JSON.stringify(data);
    return this.http.post(environment.baseUrl +api,body,{headers:headers})
      .toPromise()
      .then(response =>{
        let res:any=response;
        try {
          if(res._body){
            res=JSON.parse(res._body);
          }
        }catch (e){
        }
        this.handleResponseCode(res);
        return res;
      })
      .catch(error => {
        this.handleError(error)
      });
  }

  /**
   * 上傳圖片
   * @param api  string
   * @param data formData
   * @returns respone
   */
  flierData(api:string,data:any):Promise<any>{
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.stroage.getStroage('token')});
    return this.http.post(environment.baseUrl +api,data,{headers:headers})
      .toPromise()
      .then(response =>{
        let res:any=response;
        try {
          if(res._body){
            res=JSON.parse(res._body);
          }
        }catch (e){
          this.handleResponseCode(e);
        }
        return res;
      })
      .catch(error => {
        this.handleError(error)
      });
  }

  /**
   * 提交数据
   * @param api  string
   * @param data json
   * @returns respone
   */
  putData(api:string,data?:any):Promise<any>{
    let headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8', 'Authorization': 'Bearer '+ this.stroage.getStroage('token')});
    let body = JSON.stringify(data);
    return this.http.put(environment.baseUrl +api,body,{headers:headers})
      .toPromise()
      .then(response =>{
        let res:any=response;
        try {
          if(res._body){
            res=JSON.parse(res._body);
          }
        }catch (e){
          this.handleResponseCode(e);
        }
        return res;
      })
      .catch(error => {
        this.handleError(error)
      });
  }

  /**
   * 删除数据
   * @param api string
   * @returns {Maybe<T>|Promise<*|T>|Promise<*>|any|Promise<R>}
     */
  deleteData(api:string):Promise<any>{
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ this.stroage.getStroage('token')});
    return this.http.delete(environment.baseUrl +api,{headers:headers})
      .toPromise()
      .then(response =>{
        let res:any=response;
        try {
          if(res._body){
            res=JSON.parse(res._body);
          }
        }catch (e){
          this.handleResponseCode(e);
        }
        return res;
      })
      .catch(error => {
        this.handleError(error)
      });
  }
  private handleError(error:any):Promise<any>{
    // if(error.status==401||error.status=='401'){
    //   // alert(error.error.error.message)
    //   this.stroage.clear('token')
    //   this.router.navigate(['/Login']);
    // }
    // if(error.status==403||error.status=='403'){
    //   // alert(error.error.error.message)
    //   this.stroage.clear('token')
    //   this.router.navigate(['/Login']);
    // }
    switch (error.status) {
      case 401: // 未登录状态码
          this.stroage.clear('token')
          this.router.navigate(['/Login']);
          break;
      case 403:
          this.stroage.clear('token')
          this.router.navigate(['/Login']);
          break;
      case 500:
          alert(error.error.error.message);
          break;
      case 502:
          alert(error.error.error.message);
          break;
      case 504:
          alert(error.error.error.message);
          break;
    }
    return Promise.reject(error.message || error);
  }

  /**
   * 处理code
   * @param code
   * @returns {any}
     */
  private handleResponseCode(error: any): Promise<any>{
    return error;
  }
}
