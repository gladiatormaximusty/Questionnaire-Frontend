import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http-service';//封装的http请求
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  public pageShow:any=false
  public elLoading:any
  public DataList:any
  public search:any={
    keyword: "",
    sorting: "",
    skipCount: 0,
    maxResultCount: 10
  }
  public totalCount:any
  public sort:any="asc"
  constructor(
    public http:HttpService,
    public router:Router,
    public route: ActivatedRoute) { }

  inputSearch(e){
    this.search.skipCount=0
    if(e.keyCode == 13){
      this.searchData()
    }
  }

  ActionShow(index){
    this.DataList.forEach((item:any,i:any)=>{
      item.isShow=false
    })
    if(this.DataList[index].isShow==false){
      this.DataList[index].isShow=true
    }else{
      this.DataList[index].isShow=false
    }
  }

  ChangePage(page){
    this.search.skipCount=(page-1)*this.search.maxResultCount
    this.searchData()
  }

  DelType(id){
    this.http.postData('/api/services/app/user/Disable',{id}).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.searchData()
        }
      }else{
        alert(res.error.message)
      }
    })
  }
  sorted(){
    if(this.sort=="desc"){
      this.sort="asc"
      this.search.sorting="code asc"
    }else{
      this.sort="desc"
      this.search.sorting="code desc"
    }
    this.searchData()
  }
  searchData(){
    this.elLoading = true
    this.http.postData('/api/services/app/user/GetPagedAll',this.search).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
          console.log("Testing")
        }else{
          this.DataList=res.result.data.items
          if(this.DataList!=''){
            this.DataList.forEach((item:any,i:any)=>{
              item.isShow=false
            })
            this.pageShow=true
          }
          this.totalCount=res.result.data.totalCount
        }
      }else{
        alert(res.error.message)
      }
    })
  }
  ngOnInit(): void {
    this.searchData()
  }

  ngAfterViewInit(): void {
    // 点击隱藏彈出框
    document.addEventListener('mouseup',(e:any) =>{
      if(this.DataList!=""){
        this.DataList.forEach((item:any,i:any)=>{
          item.isShow=false
        })
      }
    })
    //防止冒泡事件
    var myDiv=document.getElementsByClassName("ng-position-absolute")
    for(var i = 0;i < myDiv.length;i++){
      myDiv[i].addEventListener('mouseup',(event:any) =>{
        event=event||window.event;
        event.stopPropagation();
      })
    }
  }
}
