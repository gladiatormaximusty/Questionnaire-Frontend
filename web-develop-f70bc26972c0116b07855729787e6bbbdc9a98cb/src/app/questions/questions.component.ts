import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http-service';//封装的http请求
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.less'],
})
export class QuestionsComponent implements OnInit {
  public pageShow:any=false
  public elLoading:any
  public DataList:any
  public search:any={
    questionTypeId: 0,
    question: "",
    sorting: "",
    status: "",
    skipCount: 0,
    maxResultCount: 10
  }
  public typeSearch:any={
    questionTypeName: "",
    questionTypeId: 0,
  }
  public totalCount:any
  public typeList:any
  public sort:any="asc"

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

  DelType(id){
    this.http.postData('/api/services/app/questions/Delete',{id}).then((res)=>{
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

  ChangeSelect(){
    this.searchData()
  }

  ChangePage(page){
    this.search.skipCount=(page-1)*this.search.maxResultCount
    this.searchData()
  }

  searchData(){
    this.elLoading = true
    this.http.postData('/api/services/app/questions/GetAll',this.search).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
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

  sorted(type){
    if(this.sort=="desc"){
      this.sort="asc"
      this.search.sorting=type+" asc"
    }else{
      this.sort="desc"
      this.search.sorting=type+" desc"
    }
    this.searchData()
  }

  searchType(){
    this.elLoading = true
    this.http.postData('/api/services/app/questionTypes/GetAll',this.typeSearch).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.typeList=res.result.data
        }
      }else{
        alert(res.error.message)
      }
    })

  }

  constructor(
    public http:HttpService,
    public router:Router,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.searchType()
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
