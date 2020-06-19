import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.less']
})
export class EntitiesComponent implements OnInit {

  //加載
  public elLoading:any;

  //indxe判斷是否有空值：
  public index: boolean = true;

  public list: Array<any> = [
    {
      "entityName": "",
      "id": 0
    }
  ];
  //初始化數據接收：
  public inspect:any = {"isOnlyShowActiveStatus": true}

  constructor(
    public http: HttpService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.elLoading = true;
    this.list=[];
    this.http.postData("/api/services/app/entities/GetAll",this.inspect).then((res)=>{
      if(res.error == null){
      let ActiveArr:any;
      ActiveArr=res.result.data;

      for(let i =0; i<ActiveArr.length; i++){
        this.list.push(ActiveArr[i])
      }
      this.elLoading = false;
      }else{
        alert("服務器異常，請聯繫管理員");
      }

    })

  }

  //增加輸入框：
  addInput(): void {
    this.list.push(
      {
        "entityName": "",
        "id": 0
      }
    );
  }

  //刪除輸入框：
  deleteItem(key): void {
    this.list.splice(key, 1);
    if(this.list.length==0){
      this.index = false;
    }
  }

  //保存資料(送回資料庫)
  sendData(): void {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].entityName == "" || this.list[i].entityName.trim().length ==0) {
        this.index = false;
      }
    }
    if (this.index == false ||this.list.length==0) {
      alert('Please enter the Entity Name')
      this.index = true;
    } else {
      this.http.postData('/api/services/app/entities/InsertOrUpdate', this.list)
        .then(res => {
          if (res.error == null) {
            if (res.result.status.code == 200) {
              this.router.navigate(['/Entities'])
              // this.list = [{
              //   "entityName": "",
              //   "id": 0
              // }];
              alert("Save successfully")
            } else {
              alert("服务器异常，请联系管理员")
            }
          }
        })
    }
  }

  // //回到HomePage：
  // backToHomePage():void{
  //   this.router.navigate(['Homepage'])
  // }

}
