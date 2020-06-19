import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http-service';//封装的http请求
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.less']
})
export class MyQuestionsComponent implements OnInit {
  tableData = [
    {title:'Incomplete Questionnaires',number:'3'},
    {title:'Reviewing Questionnaires',number:'11'},
    {title:'Completed Questionnaires',number:'11'}
  ];
  public pageShow:any=false
  public elLoading:any
  public nowIndex = 'Pending';
  public DataList:any[]=[]
  public totalCount:any
  public NumberData:any={
    pendingQuestionnaireCount: 0,
    reviewingQuestionnaireCount: 0,
    finishedQuestionnaireCount: 0
  }
  public imagesTX:any
  public Search:any={
    "status": "",
    "questionnaireName": "",
    "sorting": "",
    "skipCount": 0,
    "maxResultCount": 10
  }
  public isEdit:any=true
  constructor(
    public http:HttpService,
    public router:Router,
    public route: ActivatedRoute) { }

  searchData(data){
    this.nowIndex = data;
    this.Search.status=data
    this.Search.questionnaireName=""
    this.elLoading = true
    if(data=='Finished'||data=='Reviewing'){
      this.isEdit=false
    }else{
      this.isEdit=true
    }
    this.SearchInput()
  }
  ChangePage(page){
    this.Search.skipCount=(page-1)*this.Search.maxResultCount
    this.SearchInput()
  }
  SearchInput(){
    this.http.postData('/api/services/app/myQuestionnaire/GetAll',this.Search).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.DataList=res.result.data.items
          this.totalCount=res.result.data.totalCount
          this.pageShow=true
        }
      }else{
        alert(res.error.message)
      }
    })
  }
  ngOnInit(): void {
    this.elLoading = true
    this.imagesTX=localStorage.getItem('image')
    this.http.postData('/api/services/app/myQuestionnaire/GetMyQuestionnaireStatusCount',{}).then((res)=>{
      this.elLoading = false
      if(res.error==null){
        if(res.result.status.code!=200){
          alert(res.result.status.message)
        }else{
          this.NumberData=res.result.data
        }
      }else{
        alert(res.error.message)
      }
    })
    this.searchData("Pending")

  }

}
