import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http-service';//封装的http请求
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-question-type-info',
  templateUrl: './question-type-info.component.html',
  styleUrls: ['./question-type-info.component.less']
})
export class QuestionTypeInfoComponent implements OnInit {
  public pageShow:any=false
  public elLoading:any
  public DataList:any
  public search:any ={
    id:''
  }
  public questions:any={
    questionTypeId: 0,
    question: "",
    sorting: "",
    isOnlyShowActiveStatus: false,
    skipCount: 0,
    maxResultCount: 10
  }
  public totalCount:any
  public TypeInfo:any={}
  public sort:any="asc"
  constructor(
    public http:HttpService,
    public router:Router,
    public route: ActivatedRoute
  ) {}

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
    this.questions.skipCount=(page-1)*this.questions.maxResultCount
    this.searchData()
  }

  sorted(type){
    if(this.sort=="desc"){
      this.sort="asc"
      this.questions.sorting=type+" asc"
    }else{
      this.sort="desc"
      this.questions.sorting=type+" desc"
    }
    this.searchData()
  }

  addType(){
    var patt = /^[\s]*$/;
    if(this.TypeInfo.questionTypeName=='' || this.TypeInfo.questionTypeCode == ''){
      alert("Please enter Question Type Name and Question Type ID")
      return
    }
    if(!patt.test(this.TypeInfo.questionTypeName)||!patt.test(this.TypeInfo.questionTypeCode)){
      alert('Please enter the correct Question Type Name and Question Type ID')
    }
    this.elLoading = true
    this.http.postData('/api/services/app/questionTypes/InsertOrUpdate',this.TypeInfo).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.router.navigate(['/QuestionTypes'])
        }
      }else{
        alert(res.error.message)
      }
    })
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

  ngOnInit(): void {
    this.route.queryParams.subscribe((res: any) => {
        this.search.id=res.id
    })
    this.elLoading = true
    this.http.getData("/api/services/app/questionTypes/GetQuestionTypesById",this.search).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.TypeInfo = res.result.data
          this.TypeInfo.questionTypeCode=this.TypeInfo.questionTypeCode.replace(/^\s+|\s+$/g, "")
          this.TypeInfo.questionTypeName=this.TypeInfo.questionTypeName.replace(/^\s+|\s+$/g, "")
          this.questions.questionTypeId = this.TypeInfo.id
          this.searchData()
        }
      }else{
        alert(res.error.message)
      }
    })
  }

  searchData(){
    this.elLoading = true
    this.http.postData('/api/services/app/questions/GetAll',this.questions).then((res)=>{
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
